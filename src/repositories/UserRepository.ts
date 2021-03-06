import { getRepository, Repository } from "typeorm";
import { UserDto } from "../dto/UserDto";
import { User } from "../models/User";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }

  async find(): Promise<User[]> {
    return await this.repository.find();
  }

  async createOrUpdate({
    email,
    name,
    password,
    id,
    balance,
  }: UserDto): Promise<User> {
    let user: User;
    if (id) {
      const oldUser = await this.repository.findOne(id);
      user = {
        ...oldUser,
        name,
        email,
        balance,
        hashPassword: password,
      };
    } else {
      user = this.repository.create({
        name,
        email,
        hashPassword: password,
      });
    }
    await this.repository.save(user);
    return user;
  }
}
