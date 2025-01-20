import mongoose, { Schema } from "mongoose";
import { thirtyDaysFromNow } from "../../common/utils/date-time";

export interface SessionDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<SessionDocument>({
  userId: { type: Schema.Types.ObjectId, required: true, index: true, ref: "User" },
  userAgent: { type: String, required: false },
  expiredAt: { type: Date, required: true, default: thirtyDaysFromNow },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
  toJSON: { getters: true, virtuals: true },
});

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);
export default SessionModel;