import { DataTypes, Model } from "sequelize";
import sequelize from '../database';
import { compareValue, hashValue } from "@/common/utils/bcrypt";

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public comparePassword!: (value: string) => Promise<boolean>;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
});

User.beforeCreate(async (user: User) => {
  user.password = await hashValue(user.password);
});

User.beforeUpdate(async (user: User) => {
  if (user.changed("password")) {
    user.password = await hashValue(user.password);
  }
});

User.prototype.comparePassword = async function (value: string): Promise<boolean> {
  return await compareValue(value, this.password);
};

export default User;