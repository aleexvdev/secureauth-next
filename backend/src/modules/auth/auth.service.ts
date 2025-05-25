import { ErrorCode } from "@/common/enums/error-code.enum";
import { VerificationEnumm } from "@/common/enums/verification-code.enum";
import { LoginDto, RegisterDto, ResetPasswordDto } from "@/common/interface/auth.interface";
import { hashValue } from "@/common/utils/bcrypt";
import { BadRequestException, InternalServerException, UnauthorizedException } from "@/common/utils/catch-error";
import { anHourFromNow, calculateExpirationDate, fortyFiveMinutesFromNow, ON_DAY_IN_MS, threeMinutesAgo } from "@/common/utils/date-time";
import { RefreshTokenPayload, refreshTokenSignOptions, signJwtToken, verifyJwtToken } from "@/common/utils/jwt";
import { logger } from "@/common/utils/logger";
import { parseUserAgent } from "@/common/utils/user-agent-parser";
import { config } from "@/config/app.config";
import SessionModel from "@/database/models/session.model";
import UserModel from "@/database/models/user.model";
import VerificationCode from "@/database/models/verification.model";
import { sendEmail } from "@/mailers/mailer";
import { passwordResetTemplate, verifyEmailTemplate } from "@/mailers/templates/template";
import { Op } from "sequelize";

export class AuthService {
  constructor() { }

  async register(payload: RegisterDto) {
    const { username, email, password } = payload;
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException("User already exists with this email", ErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
    }
    const newUser = await UserModel.create({
      username,
      email,
      password,
    });
    const verificationCode = await VerificationCode.create({
      userId: newUser.id,
      type: VerificationEnumm.EMAIL_VERIFICATION,
      expiredAt: fortyFiveMinutesFromNow(),
    });
    const verifyEmailUrl = `${config.CORS.CORS_ORIGIN}/confirm-account?code=${verificationCode.code}`;
    await sendEmail({
      to: newUser.email,
      ...verifyEmailTemplate(verifyEmailUrl)
    });
    return {
      user: newUser
    }
  }

  async login(payload: LoginDto) {
    const { email, password, userAgent, ipAddress, location } = payload;
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      logger.info("Invalid email or password provided for login");
      throw new BadRequestException("Invalid email or password provided", ErrorCode.AUTH_USER_NOT_FOUND);
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      logger.info("Invalid email or password provided for login");
      throw new BadRequestException("Invalid email or password provided", ErrorCode.AUTH_USER_NOT_FOUND);
    }
    const { browser, os, device } = parseUserAgent(String(userAgent));

    const session = await SessionModel.create(
      {
        userId: user.id,
        userAgent,
        ipAddress: String(ipAddress),
        location: String(location),
        device: String(device),
        browser: String(browser),
        os: String(os),
      }
    );

    const accessToken = signJwtToken({
      userId: user.id,
      sessionId: session.id,
    });

    const refreshToken = signJwtToken({
      sessionId: session.id,
    }, refreshTokenSignOptions);

    return {
      user,
      accessToken,
      refreshToken,
      mfaRequired: user.userPreferences.enable2FA,
    }
  }

  async refreshToken(data: string) {
    const { payload, isValid } = verifyJwtToken<RefreshTokenPayload>(data, {
      secret: config.JWT.REFRESH_SECRET,
    });

    if (!isValid || !payload) {
      throw new UnauthorizedException("Invalid refresh token");
    }
    const session = await SessionModel.findByPk(payload.sessionId);
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
      sessionId: session.id,
    }, refreshTokenSignOptions) : undefined;
    const accessToken = signJwtToken({
      userId: session.userId,
      sessionId: session.id,
    });
    return {
      accessToken,
      newRefreshToken
    }
  }

  async verifyEmail(code: string) {
    const validCode = await VerificationCode.findOne({
      where: {
        code,
        type: VerificationEnumm.EMAIL_VERIFICATION,
        expiredAt: { [Op.gt]: new Date(), }
      },
    });
    if (!validCode) {
      throw new BadRequestException("Invalid or expired verification code");
    }
    const updatedUser = await UserModel.update(
      { isEmailVerified: true },
      {
        where: {
          id: validCode.userId,
        },
      }
    );
    if (!updatedUser) {
      throw new BadRequestException("Unable to verify email address", ErrorCode.VALIDATION_ERROR);
    }
    await validCode.destroy();
    return {
      user: updatedUser,
    };
  }

  async forgotPassword(email: string) {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException("User not found", ErrorCode.AUTH_USER_NOT_FOUND);
    }
    const timeAgo = threeMinutesAgo();
    const maxAttempts = 2;
    const count = await VerificationCode.count({
      where: {
        userId: user.id,
        type: VerificationEnumm.PASSWORD_RESET,
        expiredAt: { [Op.gt]: timeAgo },
      },
    });
    if (count >= maxAttempts) {
      throw new UnauthorizedException(
        "Too many attempts, try again later",
        ErrorCode.AUTH_TOO_MANY_ATTEMPTS
      );
    }
    const expiresAt = anHourFromNow();
    const validCode = await VerificationCode.create({
      userId: user.id,
      type: VerificationEnumm.PASSWORD_RESET,
      expiredAt: expiresAt,
    });
    const resetPasswordUrl = `${config.CORS.CORS_ORIGIN}/reset-password?code=${validCode.code}&exp=${expiresAt.getTime()}`;
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

  async resetPassword(payload: ResetPasswordDto) {
    const { password, verificationCode } = payload;
    const validCode = await VerificationCode.findOne({
      where: {
        code: verificationCode,
        type: VerificationEnumm.PASSWORD_RESET,
        expiredAt: { [Op.gt]: new Date() }
      },
    });
    if (!validCode) {
      throw new BadRequestException("Invalid or expired verification code");
    }
    const hashedPassowrd = await hashValue(password);
    const updatedUser = await UserModel.update({ password: hashedPassowrd }, { where: { id: validCode.userId } });
    if (!updatedUser) {
      throw new BadRequestException("Unable to reset password");
    }
    await validCode.destroy();
    await SessionModel.destroy({
      where: {
        userId: validCode.userId,
      },
    });
    return {
      user: updatedUser,
    };
  }

  async logout(sessionId: string) {
    if (!sessionId) {
      throw new BadRequestException(
        "Session not found",
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }
    const deletedRows = await SessionModel.destroy({
      where: { id: sessionId },
    });
    if (deletedRows === 0) {
      throw new BadRequestException(
        "Session not found or already expired",
        ErrorCode.AUTH_USER_NOT_FOUND
      );
    }
    return;
  }
}