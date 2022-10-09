import { Schema, model } from "mongoose";
import { NotificationInterface } from "../utilities/interface";

const notificationSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, maxLength: 50 },
    message: { type: String, maxLength: 3000 },
    status: { type: String, enum: ["read", "unread"], default: "unread" }
  },
  { timestamps: true }
);

export default model<NotificationInterface>("Notification", notificationSchema);
