import { randomUUID } from "node:crypto";
import { Stocks } from "../MockData_Back.js";

export class StockModel {
  static async getWarehouses() {
    const warehouses = Stocks.map((W) => ({
      warehouse: W.warehouse,
      id: W.id,
    }));
    return warehouses;
  }

  static async getWarehouseByID(id) {
    const warehouse = Stocks.find((W) => W.id === id);
    return warehouse ? warehouse.items : null;
  }

  static async createWarehouse({ warehouse, items }) {
    const newWarehouse = {
      id: randomUUID(),
      warehouse,
      items,
    };

    Stocks.push(newWarehouse);
    return newWarehouse
  }
}
