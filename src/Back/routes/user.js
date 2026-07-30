import { Router } from "express";
import multer from "multer";
import { UserController } from "../Controller/user.js";

const upload = multer({ dest: "uploads/" });
export const userRoute = Router();

userRoute.put("/modificar/:id", upload.single("userImage"), UserController.modifyUser);
