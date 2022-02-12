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

  async findAll(request: Request, response: Response) {
    const userService = container.resolve(UserService);
    const users = await (
      await userService.findAll()
    ).map(({ hashPassword, ...user }) => ({ ...user }));
    response.json(users);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;
    const userService = container.resolve(UserService);
    const { hashPassword, ...user } = await userService.findById(id);
    response.json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, password } = request.body;
    const userService = container.resolve(UserService);
    await userService.update(id, { name, email, password });
    response.send();
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const userService = container.resolve(UserService);
    await userService.delete(id);
    response.status(204).send();
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const userService = container.resolve(UserService);
    const token = await userService.login({ email, password });
    response.json({ token });
  }

  async deposit(request: Request, response: Response) {
    const { id } = request.params;
    const { value } = request.body;
    const userService = container.resolve(UserService);
    await userService.deposit(id, parseInt(value));
    response.status(200).send();
  }

  async withdraw(request: Request, response: Response) {
    const { id } = request.params;
    const { value } = request.body;
    const userService = container.resolve(UserService);
    await userService.withdraw(id, parseInt(value));
    response.status(200).send();
  }

  async transfer(request: Request, response: Response) {
    const { idFrom, idTo } = request.params;
    const { value } = request.body;
    const userService = container.resolve(UserService);
    await userService.transfer(idFrom, idTo, value);
    response.status(200).send();
  }
}
