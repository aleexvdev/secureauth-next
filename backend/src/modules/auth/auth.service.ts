import { ErrorCode } from "../../common/enums/error-code.enum";
import { VerificationEnumm } from "../../common/enums/verification-code.enum";
import { RegisterDto } from "../../common/interface/auth.interface";
import { BadRequestException } from "../../common/utils/catch-error";
import { fortyFiveMinutesFromNow } from "../../common/utils/date-time";
import UserModel from "../../database/models/user.model";
import VerificationCodeModel from "../../database/models/verification.model";

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
}