import { Response } from "express";

export abstract class APIError extends Error {
  constructor(public message = "error", protected response: ErrorResponse) {
    super(message);
  }

  public respond(res: Response) {
    this.response.sendResponse(res);
  }
}

export class BadRequestError extends APIError {
  constructor() {
    super("Bad request", new BadRequestResponse());
  }
}

export class NotFoundError extends APIError {
  constructor() {
    super("Not found", new NotFoundResponse());
  }
}

export class InternalError extends APIError {
  constructor() {
    super("Internal error", new InternalErrorResponse());
  }
}

enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export class ErrorResponse {
  constructor(protected statusCode: StatusCode, protected message: string) {}

  public sendResponse(res: Response) {
    res.status(this.statusCode).json(this.getBody());
  }

  getBody() {
    return {
      message: this.message,
    };
  }
}

export class BadRequestResponse extends ErrorResponse {
  constructor() {
    super(StatusCode.BAD_REQUEST, "Bad request");
  }
}

export class NotFoundResponse extends ErrorResponse {
  constructor() {
    super(StatusCode.NOT_FOUND, "Could not find resource");
  }
}

export class InternalErrorResponse extends ErrorResponse {
  constructor() {
    super(StatusCode.NOT_FOUND, "Internal error");
  }
}
