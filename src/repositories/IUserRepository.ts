import { UserDto } from "../dto/UserDto";
import { User } from "../models/User";

export interface IUserRepository {
  create(userDto: UserDto): Promise<User>;
  find(): Promise<User[]>;
}
