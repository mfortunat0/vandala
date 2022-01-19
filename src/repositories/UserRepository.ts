import { getRepository, Repository } from "typeorm";
import { UserDto } from "../dto/UserDto";
import { User } from "../models/User";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async find(): Promise<User[]> {
    return await this.repository.find();
  }

  async create({ name }: UserDto): Promise<User> {
    const user = this.repository.create({ name });
    await this.repository.save(user);
    return user;
  }
}
