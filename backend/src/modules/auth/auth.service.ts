import { ErrorCode } from "../../common/enums/error-code.enum";
import { VerificationEnumm } from "../../common/enums/verification-code.enum";
import { LoginDto, RegisterDto } from "../../common/interface/auth.interface";
import { BadRequestException, UnauthorizedException } from "../../common/utils/catch-error";
import { calculateExpirationDate, fortyFiveMinutesFromNow, ON_DAY_IN_MS } from "../../common/utils/date-time";
import { RefreshTokenPayload, refreshTokenSignOptions, signJwtToken, verifyJwtToken } from "../../common/utils/jwt";
import { config } from "../../config/app.config";
import SessionModel from "../../database/models/session.model";
import UserModel from "../../database/models/user.model";
import VerificationCodeModel from "../../database/models/verification.model";
import jwt from "jsonwebtoken";

export class AuthService {
  public async register(registerData: RegisterDto) {
    const { name, username, email, password, confirmPassword, userAgent } = registerData;

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
}