import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repositories/IUserRepository";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserDto } from "../dto/UserDto";
@injectable()
export class UserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async create({ name, email, password }: UserDto) {
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

  async login({ email, password }: UserDto) {
    const user = await this.userRepository.findByEmail(email);
    if (await compare(password, user.password)) {
      return sign({}, process.env.HASH_TOKEN, {
        subject: user.id,
      });
    }
  }
}
