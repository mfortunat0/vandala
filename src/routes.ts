import { Router } from "express";
import morgan from "morgan";
import { userRoutes } from "./routes/UserRoutes";

const routes = Router();

routes.use(morgan("common"));
routes.use("/user", userRoutes);
routes.get("/check", (request, response) => response.send("OK"));

export { routes };
