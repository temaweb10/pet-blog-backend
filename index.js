import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import * as PostController from "./controllers/PostController.js";
import * as UserController from "./controllers/UserController.js";
import checkAuth from "./utils/checkAuth.js";
import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validations.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.connectMongoDbURL)
  .then(() => {
    console.log("DB WORK");
  })
  .catch((err) => {
    console.log("DB ERROR", err);
  });

app.use(express.json());

app.post("/auth/register", registerValidation, UserController.register);
app.post("/auth/login", loginValidation, UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.get("/posts", PostController.getAll);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
