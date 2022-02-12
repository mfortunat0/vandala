import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAdmin } from "../middlewares/authAdmin";
import { ensureAuthenticate } from "../middlewares/authMiddleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/:id", ensureAuthenticate, userController.findById);
userRoutes.put("/:id", ensureAuthenticate, userController.update);
userRoutes.delete("/:id", ensureAuthenticate, userController.delete);

userRoutes.get("", ensureAuthenticate, userController.findAll);
userRoutes.post("", ensureAuthenticate, userController.create);

userRoutes.post("/login", userController.login);
userRoutes.post("/deposit/:id", ensureAuthenticate, userController.deposit);
userRoutes.post("/withdraw/:id", ensureAuthenticate, userController.withdraw);
userRoutes.post(
  "/transfer/:idFrom/to/:idTo",
  ensureAuthenticate,
  userController.transfer
);

export { userRoutes };
