import mongoose from "mongoose";
import { WordSchema } from "./word";

export interface IUser {
  _id: string;
  name: string;
}

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },

  words: [WordSchema],
});

export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);
