import { StockModel } from "../model/stock.js";

export class StockController {
  static async getWarehouses(req, res) {
    const warehouses = await StockModel.getWarehouses();
    return res.json({ warehouses });
  }

  static async getWarehouseByID(req, res) {
    const { id } = req.params;
    const warehouseItems = await StockModel.getWarehouseByID(id);
    if (!warehouseItems) {
      return res.status(404).json({ message: "Warehouse non-existent" });
    }
    return res.json({ warehouse: warehouseItems });
  }

  static async createWarehouse (req, res) {
  const { warehouse, items } = req.body;

  if (!warehouse || typeof warehouse !== "string") {
    return res
      .status(400)
      .json({ message: "Warehouse is required and must be an string" });
  }

  if (!Array.isArray(items)) {
    return res.status(400).json({ message: "Items must be an array" });
  }
  const newWarehouse = await StockModel.createWarehouse({ warehouse, items });
  res
    .status(201)
    .json({
      messge: "New warehouse created succesfylly",
      "warehouse created": newWarehouse,
    });
}

 static async deleteWarehouse(req,res) {
  const {id} = req.params;
  const deleted = await StockModel.deleteWarehouse({id});
  if(!deleted){
    return res.status(404).json({ message: "Warehouse non-existent" });
  }
  return res.status(202).json({message: 'Stock removed'})
 }
}
