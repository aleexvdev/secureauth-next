import mongoose, { Document, Schema } from "mongoose";
import { compareValue, hashValue } from "../../common/utils/bcrypt";

interface UserPreferences {
  enable2FA: boolean;
  emailNotification: boolean;
  twoFactorSecret?: string;
}

export interface UserDocument extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  userPreferences: UserPreferences;
  comparePassword(value: string): Promise<boolean>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userPreferencesSchema = new Schema<UserPreferences>({
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
  userPreferences: { type: userPreferencesSchema, default: {} },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
  toJSON: {},
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
    if (returnedObject.UserPreferences && returnedObject.UserPreferences.twoFactorSecret) {
      delete returnedObject.UserPreferences.twoFactorSecret;
    }
    return returnedObject;
  },
});

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;