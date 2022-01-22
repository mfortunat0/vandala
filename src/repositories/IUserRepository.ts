import { UserDto } from "../dto/UserDto";
import { User } from "../models/User";

export interface IUserRepository {
  createOrUpdate(userDto: UserDto): Promise<User>;
  find(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  delete(id: string): Promise<void>;
}
