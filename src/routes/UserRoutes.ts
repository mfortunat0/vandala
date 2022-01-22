import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAdmin } from "../middlewares/authAdmin";
import { ensureAuthenticate } from "../middlewares/authMiddleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get(
  "/user/:id",
  ensureAuthenticate,
  ensureAdmin,
  userController.findAll
);

userRoutes.get(
  "/user",
  ensureAuthenticate,
  ensureAdmin,
  userController.findAll
);

userRoutes.post(
  "/user",
  ensureAuthenticate,
  ensureAdmin,
  userController.create
);

userRoutes.put(
  "/user/:id",
  ensureAuthenticate,
  ensureAdmin,
  userController.update
);

userRoutes.delete(
  "/user/:id",
  ensureAuthenticate,
  ensureAdmin,
  userController.delete
);

userRoutes.post("/user/login", userController.login);

export { userRoutes };
