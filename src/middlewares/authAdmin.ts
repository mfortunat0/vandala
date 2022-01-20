import { NextFunction, Request, Response } from "express";
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
    throw new Error("Is not a admin");
  }
  next();
};

export { ensureAdmin };
