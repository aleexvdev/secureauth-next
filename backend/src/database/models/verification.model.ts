import mongoose from "mongoose";
import { VerificationEnumm } from "../../common/enums/verification-code.enum";
import { generateUUID } from "../../common/utils/uuid";

export interface VerificationCodeDocument extends Document {
  userId: mongoose.Types.ObjectId;
  code: string;
  type: VerificationEnumm;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: "User" },
  code: { type: String, required: true, unique: true, default: generateUUID },
  type: { type: String, required: true },
  expiredAt: { type: Date, required: true, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
  toJSON: { getters: true, virtuals: true },
});

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
  "VerificationCode", 
  verificationCodeSchema,
  "verification_codes"
);

export default VerificationCodeModel;