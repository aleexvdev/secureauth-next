import { ErrorCode } from "@/common/enums/error-code.enum";
import { LoginDto, RegisterDto } from "@/common/interface/auth.interface";
import { BadRequestException } from "@/common/utils/catch-error";
import User from "@/database/models/user.model";

export class AuthService {
  constructor() { }

  async register(payload: RegisterDto) {
    const { username, email, password } = payload;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException("User already exists with this email", ErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
    }
    const newUser = await User.create({
      username,
      email,
      password,
    });
    return {
      user: newUser
    }
  }

  async login(payload: LoginDto) {
    const { email, password } = payload;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException("Invalid email or password provided", ErrorCode.AUTH_USER_NOT_FOUND);
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new BadRequestException("Invalid email or password provided", ErrorCode.AUTH_USER_NOT_FOUND);
    }
    return {
      user,
    }
  }
}