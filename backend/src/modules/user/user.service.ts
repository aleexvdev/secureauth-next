import { CreateUserDto, UpdateUserDto } from "@/common/interface/user.interface";
import User from "@/database/models/user.model";

export class UserService {
  async findUserById(id: string) {
    return User.findByPk(id, {
      attributes: ["id", "username", "email", "isEmailVerified"],
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
}
export default new UserService();