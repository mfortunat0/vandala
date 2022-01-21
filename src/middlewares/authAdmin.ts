import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../repositories/UserRepository";

const ensureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { userId } = response.locals;
  const userRepository = new UserRepository();
  const user = await userRepository.findById(userId);
  if (!user.admin) {
    throw new AppError("Is not a admin", 403);
  }
  next();
};

export { ensureAdmin };
