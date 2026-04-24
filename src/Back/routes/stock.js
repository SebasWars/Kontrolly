import { Router } from "express";
import { StockController } from "../Controller/Stock.js";

export const warehousesRoute = Router();

/* INVENTARIO */
warehousesRoute.get("/", StockController.getWarehouses);
warehousesRoute.get("/:id", StockController.getWarehouseByID);
warehousesRoute.post("/", StockController.createWarehouse);
