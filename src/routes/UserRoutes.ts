import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAdmin } from "../middlewares/authAdmin";
import { ensureAuthenticate } from "../middlewares/authMiddleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/:id", ensureAuthenticate, userController.findAll);
userRoutes.get("", ensureAuthenticate, userController.findAll);
userRoutes.post("", userController.create);
userRoutes.put("/:id", ensureAuthenticate, userController.update);

userRoutes.delete("/:id", ensureAuthenticate, userController.delete);

userRoutes.post("/login", userController.login);
userRoutes.post("/deposit/:id", ensureAuthenticate, userController.deposit);
userRoutes.post("/withdraw/:id", ensureAuthenticate, userController.withdraw);
userRoutes.post(
  "/transfer/:idFrom/to/:idTo",
  ensureAuthenticate,
  userController.transfer
);
userRoutes.post(
  "/transfer/:idFrom/to/:idTo",
  ensureAuthenticate,
  userController.transfer
);

export { userRoutes };
