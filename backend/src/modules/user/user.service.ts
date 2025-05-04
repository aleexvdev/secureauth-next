import { CreateUserDto, UpdateUserDto } from "@/common/interface/user.interface";
import User from "@/database/models/user.model";

export class UserService {
  async getUserById(id: string) {
    return User.findByPk(id, {
      attributes: ["id", "name", "email", "username"],
      include: ['role'],
    });
  }

  async getUserByEmail(email: string) {
    return User.findOne({
      where: {
        email,
      },
      attributes: ["id", "name", "email", "username"],
      include: ['role'],
    });
  }
}
export default new UserService();