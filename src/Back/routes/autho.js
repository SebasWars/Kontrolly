import { Router } from "express";
import bcrypt from "bcrypt";
import { authorizationController } from "../Controller/authorization.js";

export const authRoute = Router();

authRoute.post("/login", authorizationController.logIn);
