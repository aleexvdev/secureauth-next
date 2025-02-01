import { ErrorCode } from "../../common/enums/error-code.enum";
import { VerificationEnumm } from "../../common/enums/verification-code.enum";
import { LoginDto, RegisterDto, ResetPasswordDto } from "../../common/interface/auth.interface";
import { BadRequestException, HttpException, InternalServerException, UnauthorizedException } from "../../common/utils/catch-error";
import { anHourFromNow, calculateExpirationDate, fortyFiveMinutesFromNow, ON_DAY_IN_MS, threeMinutesAgo } from "../../common/utils/date-time";
import { RefreshTokenPayload, refreshTokenSignOptions, signJwtToken, verifyJwtToken } from "../../common/utils/jwt";
import { config } from "../../config/app.config";
import SessionModel from "../../database/models/session.model";
import UserModel from "../../database/models/user.model";
import VerificationCodeModel from "../../database/models/verification.model";
import { sendEmail } from "../../mailers/mailer";
import { passwordResetTemplate, verifyEmailTemplate } from "../../mailers/templates/template";
import { HTTPSTATUS } from "../../config/http.config";
import { hashValue } from "../../common/utils/bcrypt";

export class AuthService {
  public async register(registerData: RegisterDto) {
    const { name, username, email, password } = registerData;

    const userExists = await UserModel.exists({ email });
    if (userExists) {
      throw new BadRequestException("User already exists with this email", ErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
    }

    const newUser = await UserModel.create({
      name,
      username,
      email,
      password,
    });

    const userId = newUser._id;
    const verificationCode = await VerificationCodeModel.create({
      userId,
      type: VerificationEnumm.EMAIL_VERIFICATION,
      expiresAt: fortyFiveMinutesFromNow(),
    });

    const verifyEmailUrl = `${config.APP_ORIGIN}/confirm-account?code=${verificationCode.code}`;
    await sendEmail({
      to: newUser.email,
      ...verifyEmailTemplate(verifyEmailUrl)
    });

    return {
      user: newUser
    }
  }

  public async login(loginData: LoginDto) {
    const { email, password, userAgent } = loginData;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new BadRequestException("Invalid email or password provided", ErrorCode.AUTH_USER_NOT_FOUND);
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new BadRequestException("Invalid email or password provided", ErrorCode.AUTH_USER_NOT_FOUND);
    }

    const session = await SessionModel.create({
      userId: user._id,
      userAgent,
    });

    const accessToken = signJwtToken({
      userId: user._id,
      sessionId: session._id,
    });

    const refreshToken = signJwtToken({
      sessionId: session._id,
    }, refreshTokenSignOptions);

    return {
      user,
      accessToken,
      refreshToken,
      mfaRequired: false,
    }

  }

  public async refreshToken(refreshToken: string) {
    const { payload, isValid } = verifyJwtToken<RefreshTokenPayload>(refreshToken, {
      secret: config.JWT.REFRESH_SECRET,
    });

    if (!isValid || !payload) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const session = await SessionModel.findById(payload.sessionId);
    const now = Date.now();

    if (!session) {
      throw new UnauthorizedException("Session does not exist");
    }
    if (session.expiredAt.getTime() < now) {
      throw new UnauthorizedException("Session expired");
    }

    const sessionRequiresRefresh = session.expiredAt.getTime() - now <= ON_DAY_IN_MS;
    if (sessionRequiresRefresh) {
      session.expiredAt = calculateExpirationDate(config.JWT.EXPIRES_IN);
      await session.save();
    }

    const newRefreshToken = sessionRequiresRefresh ? signJwtToken({
      sessionId: session._id,
    }, refreshTokenSignOptions) : undefined;

    const accessToken = signJwtToken({
      userId: session.userId,
      sessionId: session._id,
    });

    return {
      accessToken,
      newRefreshToken
    }
  }

  public async verifyEmail(code: string) {
    const validCode = await VerificationCodeModel.findOne({
      code,
      type: VerificationEnumm.EMAIL_VERIFICATION,
      expiresAt: { $gt: Date() }
    });

    if (!validCode) {
      throw new BadRequestException("Invalid or expired verification code");
    }

    const updatedUser = await UserModel.findByIdAndUpdate(validCode.userId, {
      isEmailVerified: true,
    }, {
      new: true,
    });

    if (!updatedUser) {
      throw new BadRequestException("Unable to verify email address", ErrorCode.VALIDATION_ERROR);
    }

    await validCode.deleteOne();

    return {
      user: updatedUser,
    };
  }

  public async forgotPassword(email: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new BadRequestException("User not found", ErrorCode.AUTH_USER_NOT_FOUND);
    }

    const timeAgo = threeMinutesAgo();
    const maxAttempts = 2;

    const count = await VerificationCodeModel.countDocuments({
      userId: user._id,
      type: VerificationEnumm.PASSWORD_RESET,
      expiresAt: { $gt: timeAgo },
      attempts: { $lt: maxAttempts },
    });

    if (count >= maxAttempts) {
      throw new HttpException(
        "Too many attempts, try again later",
        HTTPSTATUS.TOO_MANY_REQUESTS, 
        ErrorCode.AUTH_TOO_MANY_ATTEMPTS
      );
    }

    const expiresAt = anHourFromNow();
    const validCode = await VerificationCodeModel.create({
      userId: user._id,
      type: VerificationEnumm.PASSWORD_RESET,
      expiresAt,
      attempts: 1,
    });

    const resetPasswordUrl = `${config.APP_ORIGIN}/reset-password?code=${validCode.code}&exp=${expiresAt.getTime()}`;
    const { data, error } = await sendEmail({
      to: user.email,
      ...passwordResetTemplate(resetPasswordUrl)
    });

    if (!data?.id) {
      throw new InternalServerException(`${error?.name} ${error?.message}`);
    }

    return {
      url: resetPasswordUrl,
      emailId: data.id,
    };
  }

  public async resetPassword(resetPasswordData: ResetPasswordDto) {
    const { password, verificationCode } = resetPasswordData;
    const validCode = await VerificationCodeModel.findOne({
      code: verificationCode,
      type: VerificationEnumm.PASSWORD_RESET,
      expiresAt: { $gt: new Date() }
    });

    if (!validCode) {
      throw new BadRequestException("Invalid or expired verification code");
    }

    const hashedPassowrd = await hashValue(password);
    const updatedUser = await UserModel.findByIdAndUpdate(validCode.userId, {
      hashedPassowrd,
    }, {
      new: true,
    });

    if (!updatedUser) {
      throw new BadRequestException("Unable to reset password");
    }

    await validCode.deleteOne();
    await SessionModel.deleteMany({ userId: updatedUser._id });

    return {
      user: updatedUser,
    };
  }

  public async logout(sessionId: string) {
    return await SessionModel.findByIdAndDelete(sessionId);
  }
}