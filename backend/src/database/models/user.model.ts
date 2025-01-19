import mongoose, { Schema } from "mongoose";
import { compareValue, hashValue } from "../../common/utils/bcrypt";

interface UserPreferences {
  enable2FA: boolean;
  emailNotification: boolean;
  twoFactorSecret: string;
}

export interface UserDocument extends UserPreferences {
  name: string;
  username: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  UserPreferences: UserPreferences;
  comparePassword(value: string): Promise<boolean>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserPreferencesSchema = new Schema<UserPreferences>({
  enable2FA: { type: Boolean, default: false },
  emailNotification: { type: Boolean, default: true },
  twoFactorSecret: { type: String, required: false },
});

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  UserPreferences: { type: UserPreferencesSchema, default: {} },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
  toJSON: { getters: true, virtuals: true },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await hashValue(user.password);
  next();
});

userSchema.methods.comparePassword = async function (value: string): Promise<boolean> {
  return await compareValue(value, this.password);
};

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
    delete returnedObject.userPreference.twoFactorSecret;
    return returnedObject;
  },
});

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;