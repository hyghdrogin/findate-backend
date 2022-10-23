import { Schema, model } from "mongoose";
import { UserInterface } from "../utilities/interface";

const userSchema = new Schema(
  {
    email: {
      type: String, unique: true, maxlength: 50, trim: true, lowercase: true
    },
    username: {
      type: String, unique: true, maxlength: 15, trim: true, lowercase: true
    },
    password: { type: String },
    name: { type: String },
    surname: { type: String },
    dob: { type: String },
    occupation: { type: String },
    interest: { type: String },
    about: { type: String },
    gender: { type: String, enum: ["male", "female", "others"] },
    photo: { type: String, upsert: true, default: "https://res.cloudinary.com/hyghdrogin/image/upload/v1666514739/Findate/user_bbdyin.png" },
    header: { type: String, upsert: true, default: "https://res.cloudinary.com/hyghdrogin/image/upload/v1665284795/Findate/findate_m0lrnn.jpg" },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    verified: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    updated: { type: Boolean, default: false },
    location: { type: String },
  },
  { timestamps: true }
);

export default model<UserInterface>("User", userSchema);
