import { Schema, model } from "mongoose";
import { WaitlistInterface } from "../utilities/interface";

const waitlistSchema = new Schema(
  {
    email: {
      type: String, unique: true, maxlength: 50, trim: true, lowercase: true
    }
  },
  { timestamps: true }
);
export default model<WaitlistInterface>("Waitlist", waitlistSchema);
