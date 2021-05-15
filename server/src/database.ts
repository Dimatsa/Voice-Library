import mongoose from "mongoose";
import { Db } from "mongodb";
import { database_url } from "./config";

export default async function initialize(): Promise<Db> {
  if (database_url == undefined) {
    return new Promise((_, reject) => {
      reject("Database URL not specified!");
    });
  }

  const connection = await mongoose.connect(database_url!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
}
