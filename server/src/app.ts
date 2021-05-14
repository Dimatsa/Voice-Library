import express, { Request, Response, NextFunction } from "express";
import apiRouter from "./routes/api";
import clientRouter from "./routes/client";
import { APIError, InternalError } from "./errors";

const app = express();

// API requests
app.use("/api", apiRouter);

// Have Node serve the files for our built React app

// express.static(path.resolve(__dirname, "../../client/build"))

// Handle requests to client
app.use(clientRouter);

// Client and API expected to handle all requests
app.use((_req, _res, next) => next(new InternalError()));

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof APIError) {
    (err as APIError).respond(res);
  } else {
    const error = new InternalError();
    error.message = err.message;
    error.respond(res);
  }
});

export default app;
