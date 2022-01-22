import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repositories/IUserRepository";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserDto } from "../dto/UserDto";
import { LoginDto } from "../dto/LoginDto";
import { AppError } from "../errors/AppError";

@injectable()
export class UserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async create({ name, email, password }: UserDto) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError("User already exists", 400);
    }
    const hashPassword = await hash(password, parseInt(process.env.HASH_SALT));
    return await this.userRepository.createOrUpdate({
      name,
      email,
      password: hashPassword,
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async update(id: string, { email, name, password }: UserDto) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("User not exists", 400);
    }

    password = await hash(password, parseInt(process.env.HASH_SALT));

    const updatedUser = {
      ...user,
      email,
      name,
      password,
    };
    const response = await this.userRepository.createOrUpdate(updatedUser);
    return response;
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not exists", 400);
    }
    if (await compare(password, user.hashPassword)) {
      return sign({}, process.env.HASH_TOKEN, {
        subject: user.id,
        expiresIn: "1d",
      });
    } else {
      throw new AppError("User not exists", 400);
    }
  }

  async deposit(id: string, value: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("User not exists", 400);
    }
    user.balance += value;
    await this.userRepository.createOrUpdate(user);
    return user;
  }

  async withdraw(id: string, value: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("User not exists", 400);
    }
    if (user.balance < value) {
      throw new AppError("Not enough balance", 400);
    }
    user.balance -= value;
    await this.userRepository.createOrUpdate(user);
    return user;
  }

  async transfer(idFrom: string, idTo: string, value) {
    const fromUser = await this.userRepository.findById(idFrom);
    if (fromUser.balance < value) {
      throw new AppError("Not enough balance", 400);
    }

    await this.withdraw(idFrom, value);
    await this.deposit(idTo, value);
  }
}
