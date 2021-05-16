import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export interface IWord {
  _id: ObjectId;
  word: string;
  data: Buffer;
}

export const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    index: true,
  },

  data: {
    type: Buffer,
    required: true,
  },
});

export const WordModel = mongoose.model<IWord & mongoose.Document>(
  "Word",
  WordSchema
);
