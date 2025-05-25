import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../database';
import User from "./user.model";
import { thirtyDaysFromNow } from "@/common/utils/date-time";

export interface SessionAttributes {
  id: number;
  userId: number;
  userAgent?: string;
  ipAddress?: string;
  location?: string;
  device?: string;
  browser?: string;
  os?: string;
  isCurrent: boolean;
  expiredAt: Date;
  revokedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

type SessionCreationAttributes = Optional<
  SessionAttributes,
  | "id"
  | "userId"
  | "userAgent"
  | "ipAddress"
  | "location"
  | "device"
  | "browser"
  | "os"
  | "isCurrent"
  | "expiredAt"
  | "revokedAt"
  | "createdAt"
  | "updatedAt"
>;

class SessionModel extends Model<SessionAttributes, SessionCreationAttributes> implements SessionAttributes {
  public id!: number;
  public userId!: number;
  public userAgent?: string;
  public ipAddress?: string;
  public location?: string;
  public device?: string;
  public browser?: string;
  public os?: string;
  public isCurrent!: boolean;
  public expiredAt!: Date;
  public revokedAt?: Date | null;
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
  userAgent: { type: DataTypes.STRING, allowNull: true },
  ipAddress: { type: DataTypes.STRING, allowNull: true },
  location: { type: DataTypes.STRING, allowNull: true },
  device: { type: DataTypes.STRING, allowNull: true },
  browser: { type: DataTypes.STRING, allowNull: true },
  os: { type: DataTypes.STRING, allowNull: true },
  isCurrent: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  expiredAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: thirtyDaysFromNow(),
  },
  revokedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Session',
  tableName: 'sessions',
  timestamps: true,
});

export default SessionModel;