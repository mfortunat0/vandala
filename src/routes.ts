import { Router } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger.json";
import { userRoutes } from "./routes/UserRoutes";

const routes = Router();

routes.use(morgan("common"));
routes.use("/user", userRoutes);
routes.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
routes.get("/check", (request, response) => response.send("OK"));

export { routes };
