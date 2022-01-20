import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserService } from "../services/UserService";

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const userService = container.resolve(UserService);
    const { hashPassword, ...user } = await userService.create({
      name,
      email,
      password,
    });
    response.json(user);
  }

  async find(request: Request, response: Response) {
    const userService = container.resolve(UserService);
    const users = await userService.find();
    response.json(users);
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const userService = container.resolve(UserService);
    const token = await userService.login({ email, password });
    response.json({ token });
  }
}
