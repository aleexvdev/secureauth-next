import { ErrorCode } from "@/common/enums/error-code.enum";
import { UpdatePasswordDto, UpdateUserDto } from "@/common/interface/user.interface";
import { BadRequestException } from "@/common/utils/catch-error";
import User from "@/database/models/user.model";

export class UserService {
  async findUserById(id: string) {
    return User.findByPk(id, {
      attributes: { exclude: ["password", "userPreferences.twoFactorSecret"] },
    });
  }

  async getUserByEmail(email: string) {
    return User.findOne({
      where: {
        email,
      },
      attributes: ["id", "username", "email", "isEmailVerified"],
    });
  }

  async updateUser(id: number, payload: UpdateUserDto) {
    const user = await User.findByPk(id);
    if(!user)  throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);
    delete (payload as any).id;
    delete (payload as any).email;
    delete (payload as any).password;
    delete (payload as any).email;
    delete (payload as any).isEmailVerified;
    delete (payload as any).userPreferences;
    await user.update(payload);
    return user;
  }

  async updatePassword(id: number, payload: UpdatePasswordDto) {
    const user = await User.findByPk(id);
    if(!user)  throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);
    await user.update({ password: payload.password });
    return user;
  }
}

export default new UserService();