import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const ensureAuthenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("Not authorized");
  }

  const payload = verify(token, process.env.HASH_TOKEN);

  if (!payload) {
    throw new Error("Not authorized");
  }

  response.locals.userId = payload.sub;
  next();
};

export { ensureAuthenticate };
