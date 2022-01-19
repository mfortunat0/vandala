import { container } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { UserRepository } from "../../repositories/UserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
