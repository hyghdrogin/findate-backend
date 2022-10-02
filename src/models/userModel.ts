import { Schema, model } from "mongoose";
import { UserInterface } from "../utilities/interface";

const userSchema = new Schema(
  {
    email: {
      type: String, unique: true, maxlength: 50, trim: true, lowercase: true
    },
    username: {
      type: String, unique: true, trim: true, lowercase: true
    },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    phone: { type: String, unique: true },
    photo: { type: String },
    header: { type: String, upsert: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    verified: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    location: { type: String },
  },
  { timestamps: true }
);

userSchema.index({
  firstName: "text",
  lastName: "text",
});

export default model<UserInterface>("User", userSchema);
