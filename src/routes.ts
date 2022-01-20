import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

const userController = new UserController();
routes.get("/user", userController.find);
routes.post("/user", userController.create);
routes.post("/user/login", userController.login);

export { routes };
