import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import { compareValue, hashValue } from "@/common/utils/bcrypt";

interface UserPreferences {
  enable2FA: boolean;
  emailNotification: boolean;
  twoFactorSecret?: string;
}

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  isEmailVerified?: boolean;
  userPreferences: UserPreferences;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "isEmailVerified" | "createdAt" | "updatedAt" | "userPreferences"> {};

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public isEmailVerified!: boolean;
  public userPreferences!: UserPreferences;
  public comparePassword!: (value: string) => Promise<boolean>; 
  toJSON() {
    const values: any = { ...this.get() };
    delete values.password
    if (values.userPreferences) {
      delete values.userPreferences.twoFactorSecret;
    }
    return values;
  }
}

UserModel.init({
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
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userPreferences: {
    type: DataTypes.JSONB, 
    defaultValue: {
      enable2FA: false,
      emailNotification: true,
    },
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
});

UserModel.beforeCreate(async (user: UserModel) => {
  user.password = await hashValue(user.password);
});

UserModel.beforeUpdate(async (user: UserModel) => {
  if (user.changed("password")) {
    user.password = await hashValue(user.password);
  }
});

UserModel.prototype.comparePassword = async function (value: string): Promise<boolean> {
  return await compareValue(value, this.password);
};

export default UserModel;