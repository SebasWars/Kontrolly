import { StockModel } from "../model/stock.js";

export class StockController {
  static async getWarehouses(req, res) {
    const userID = req.user.id;
    const warehouses = await StockModel.getWarehouses(userID);
    return res.json({ warehouses });
  }

  static async getWarehouseByID(req, res) {
    const { id } = req.params;
    const userID = req.user.id;
    const warehouseItems = await StockModel.getWarehouseByID(id, userID);
    if (!warehouseItems) {
      return res.status(404).json({ message: "Warehouse non-existent" });
    }
    return res.json({ warehouse: warehouseItems });
  }

  static async createWarehouse(req, res) {
    const { warehouse } = req.body;
    const userID = req.user.id
    if (!warehouse || typeof warehouse !== "string") {
      return res
        .status(400)
        .json({ message: "Warehouse is required and must be an string" });
    }

    const newWarehouse = await StockModel.createWarehouse({ warehouse, userID });
    return res.status(201).json({
      messge: "New warehouse created succesfylly",
      warehouse_created: newWarehouse,
    });
  }

  static async modifyWarehouse(req, res) {
    const { id } = req.params;
    const userID = req.user.id;
    const { warehouseName } = req.body;

    const warehouseToUpdate = await StockModel.updateWarehosue({
      id,
      warehouseName,
      userID,
    });

    if (!warehouseToUpdate) {
      return res
        .status(404)
        .json({ message: "Warehouse was not able to update." });
    }

    return res.status(200).json({ message: "Warehouse updated succesfully!" });
  }

  static async deleteWarehouse(req, res) {
    const { id } = req.params;
    const userID = req.user.id;
    const deleted = await StockModel.deleteWarehouse({ id, userID });
    if (!deleted) {
      return res.status(404).json({ message: "Warehouse non-existent" });
    }
    return res.status(202).json({ message: "Stock removed" });
  }
}
