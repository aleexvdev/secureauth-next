import { DataTypes, Model } from "sequelize";
import sequelize from '../database';
import { generateUUID } from "@/common/utils/uuid";
import User from "./user.model";

class VerificationCode extends Model {
  public id!: number;
  public userId!: number;
  public code!: string;
  public type!: string;
  public expiredAt!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

VerificationCode.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    }
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: generateUUID,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiredAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date.now,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date.now,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date.now,
  },
}, {
  sequelize,
  modelName: 'VerificationCode',
  tableName: 'verification_codes',
  timestamps: true,
});

export default VerificationCode;