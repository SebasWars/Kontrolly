import { Router } from "express";
import { homeController } from "../Controller/home.js";

export const homeRoute = Router()

homeRoute.get('/finance', homeController.getFinances)
homeRoute.get('/last-sales', homeController.getLastSales)
homeRoute.get('/sales-resume', homeController.getSales)