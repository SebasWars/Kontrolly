import { Router } from "express";
import { SalesController } from "../Controller/Sales.js";

export const salesRoute = Router();
/* TO CHECK */
salesRoute.get('/:warehouseId/:query', SalesController.getItemsByQuery)
salesRoute.get('/:id', SalesController.getItems)
salesRoute.post('/:id', SalesController.createSell)