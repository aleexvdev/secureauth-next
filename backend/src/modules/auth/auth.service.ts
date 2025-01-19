import { ErrorCode } from "../../common/enums/error-code.enum";
import { VerificationEnumm } from "../../common/enums/verification-code.enum";
import { LoginDto, RegisterDto } from "../../common/interface/auth.interface";
import { BadRequestException } from "../../common/utils/catch-error";
import { fortyFiveMinutesFromNow } from "../../common/utils/date-time";
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

    const accessToken = jwt.sign(
      {
        id: user._id,
        sessionId: session._id,
      },
      config.JWT.SECRET,
      {
        audience: ["user"],
        expiresIn: config.JWT.EXPIRES_IN,
      }
    );

    const refreshToken = jwt.sign(
      {
        sessionId: session._id,
      },
      config.JWT.REFRESH_SECRET,
      {
        audience: ["user"],
        expiresIn: config.JWT.REFRESH_EXPIRES_IN,
      }
    );

    return {
      user,
      accessToken,
      refreshToken,
      mfaRequired: false,
    }

  }
}