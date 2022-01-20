import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repositories/IUserRepository";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserDto } from "../dto/UserDto";
import { LoginDto } from "../dto/LoginDto";

@injectable()
export class UserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async create({ name, email, password }: UserDto) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
    const hashPassword = await hash(password, parseInt(process.env.HASH_SALT));
    return await this.userRepository.create({
      name,
      email,
      password: hashPassword,
    });
  }

  async find() {
    return await this.userRepository.find();
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not exists");
    }
    if (await compare(password, user.hashPassword)) {
      return sign({}, process.env.HASH_TOKEN, {
        subject: user.id,
        expiresIn: "1d",
      });
    }
  }
}
