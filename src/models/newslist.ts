import { Schema, model } from "mongoose";
import { NewslistInterface } from "../utilities/interface";

const newslistSchema = new Schema(
  {
    email: {
      type: String, unique: true, maxlength: 50, trim: true, lowercase: true
    }
  },
  { timestamps: true }
);
export default model<NewslistInterface>("Newslist", newslistSchema);
