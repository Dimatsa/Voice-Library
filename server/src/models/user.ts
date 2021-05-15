import mongoose, { CallbackError, Schema } from "mongoose";
import { ObjectId } from "mongodb";
import { WordModel, IWord } from "./word";

// Make sure WordModel is registered
typeof WordModel;

export interface IUser {
  _id: ObjectId;
  name: string;
  words: IWord[];
}

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },

  words: {
    type: [{ type: Schema.Types.ObjectId, ref: "Word" }],
    required: true,
  },
});

export const UserModel = mongoose.model<IUser & mongoose.Document>(
  "User",
  UserSchema
);

export const DefaultUser = new Promise(
  (resolve: (user: IUser) => void, reject) =>
    UserModel.findOne({ name: "demo" }, (err: CallbackError, obj: IUser) => {
      console.log("Default user get");
      if (err) reject(err);
      else resolve(obj);
    })
);
