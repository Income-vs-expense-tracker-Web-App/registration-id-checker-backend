import express from "express";
import { createUser, getUser } from "./controller.js";
import { upload, validateFileSizes } from "../middlewares/upload.js";
const user = express.Router();

user.post(
  "/",
  upload.fields([
    { name: "doc", maxCount: 1 },
    { name: "passport", maxCount: 1 },
  ]),
  validateFileSizes,
  createUser
);

user.get("/:registrationId", getUser);

export default user;
