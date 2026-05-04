import multer from "multer";
import { Router } from "express";

import { StockController } from "../Controller/Stock.js";
import { ItemsController } from "../Controller/Items.js";

const upload = multer({ dest: "uploads/" });
export const warehousesRoute = Router();

/* INVENTARIO */
warehousesRoute.get("/", StockController.getWarehouses);
warehousesRoute.get("/:id", StockController.getWarehouseByID);
warehousesRoute.post("/", StockController.createWarehouse);
warehousesRoute.patch("/:id", StockController.modifyWarehouse)
warehousesRoute.delete('/:id', StockController.deleteWarehouse)

warehousesRoute.post('/:id/items',upload.single("file"), ItemsController.createItem)
warehousesRoute.patch('/:warehouseID/items/:itemID/edit',upload.single("file"), ItemsController.modifyItem)
warehousesRoute.delete('/:warehouseID/items/:itemID/edit',ItemsController.deleteItem)