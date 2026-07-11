import { Router } from "express";
import { authorizationController } from "../Controller/authorization.js";

export const authRoute = Router();

authRoute.post("/login", authorizationController.logIn);
authRoute.post('/createUser', authorizationController.createUser)