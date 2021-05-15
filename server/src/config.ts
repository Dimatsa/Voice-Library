import path from "path";
import { config } from "dotenv";

config();

export const node_environment = process.env.NODE_ENV;
export const port = process.env.PORT || 3001;

export const database_url = process.env.DATABASE_URL;

export const client_path = path.resolve(__dirname, "../../client/build");
export const client_index_path = path.resolve(client_path, "index.html");

export const splitter_service = process.env.SPLITTER_SERVICE || "";
