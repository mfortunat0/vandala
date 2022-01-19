import "dotenv/config";
import "./config/database";
import "./config/container";
import express from "express";
import { UserController } from "./controllers/UserController";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const userController = new UserController();
app.get("/user", userController.find);
app.post("/user", userController.create);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
