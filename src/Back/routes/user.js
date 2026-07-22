import { Router } from "express";
import multer from "multer";
import { UserController } from "../Controller/user.js";

const upload = multer({ dest: "uploads/" });
export const userRoute = Router();

userRoute.put("modify/:id", upload.single("file"), UserController.modifyUser);
