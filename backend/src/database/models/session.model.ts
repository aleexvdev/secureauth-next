import { DataTypes, Model } from "sequelize";
import sequelize from '../database';
import { thirtyDaysFromNow } from "@/common/utils/date-time";
import User from "./user.model";

export interface SessionAttributes {
  id: number;
  userId: number;
  userAgent?: string;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

class SessionModel extends Model {
  public id!: number;
  public userId!: number;
  public userAgent?: string;
  public expiredAt!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

SessionModel.init({
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
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  expiredAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: thirtyDaysFromNow,
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
  modelName: 'Session',
  tableName: 'sessions',
  timestamps: true,
});

export default SessionModel;