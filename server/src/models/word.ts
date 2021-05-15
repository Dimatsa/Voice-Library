import mongoose from "mongoose";
import { Binary } from "mongodb";

export interface IWord {
  _id: string;
  word: string;
  data: Binary;
}

export const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    index: true,
  },

  data: Binary,
});

export default mongoose.model<IWord & mongoose.Document>("Word", WordSchema);
