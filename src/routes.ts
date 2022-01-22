import { Router } from "express";
import { userRoutes } from "./routes/UserRoutes";

const routes = Router();

routes.use("/user", userRoutes);

export { routes };
