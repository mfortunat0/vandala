import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserService } from "../services/UserService";

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const userService = container.resolve(UserService);
    const user = await userService.create({ name, email, password });
    response.json(user);
  }

  async find(request: Request, response: Response) {
    const userService = container.resolve(UserService);
    const users = await userService.find();
    response.json(users);
  }
}
