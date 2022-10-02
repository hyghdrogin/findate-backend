import { Schema, model } from "mongoose";
import { OtpInterface } from "../utilities/interface";

const otpSchema = new Schema(
  {
    email: {
      type: String, unique: true, maxlength: 50, trim: true, lowercase: true
    },
    token: { type: Number },
    expired: { type: Boolean, default: false }
  },
  { timestamps: true }
);
export default model<OtpInterface>("Otp", otpSchema);
