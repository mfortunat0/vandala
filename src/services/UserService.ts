import { inject, injectable } from "tsyringe";
import { UserDto } from "../dto/UserDto";
import { IUserRepository } from "../repositories/IUserRepository";

@injectable()
export class UserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async create({ name }: UserDto) {
    return await this.userRepository.create({ name });
  }

  async find() {
    return await this.userRepository.find();
  }
}
