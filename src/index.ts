import "dotenv/config";
import "./config/database";
import "./config/container";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";
import { AppError } from "./errors/AppError";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      response.status(error.statusCode).json({
        message: error.message,
      });
    }
    response.status(500).send();
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
