import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { ensureAdmin } from "./middlewares/authAdmin";
import { ensureAuthenticate } from "./middlewares/authMiddleware";

const routes = Router();

const userController = new UserController();
routes.get("/user", ensureAuthenticate, ensureAdmin, userController.find);
routes.post("/user", userController.create);
routes.post("/user/login", userController.login);

export { routes };
