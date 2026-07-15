import { randomUUID } from "node:crypto";
import { db } from "../App.js";

export class StockModel {
  static async getWarehouses() {
    const warehouses = await db.execute("SELECT id, warehouse FROM Warehouse");
    return warehouses.rows;
  }

  static async getWarehouseByID(id) {
    const warehouse = await db.execute({
      sql: "SELECT * FROM Items WHERE warehouse_id = ?",
      args: [id],
    });
    return warehouse.rows.length ? warehouse.rows : null;
  }

  static async createWarehouse({ warehouse, items }) {
    const id = randomUUID();
    await db.execute({
      sql: "INSERT INTO Warehouse (id,warehouse) VALUES (?, ?)",
      args: [id, warehouse],
    });

    return { id, warehouse };
  }

  static async updateWarehosue({ id, warehouseName }) {
    const currentWarehosue = await db.execute({
      sql: "UPDATE Warehouse SET Warehouse = ? WHERE id = ?",
      args: [warehouseName, id],
    });

    return currentWarehosue.rowsAffected > 0;
  }

  static async deleteWarehouse({ id }) {
    const warehouse = await db.execute({
      sql: "DELETE FROM Warehouse WHERE id = ?",
      args: [id],
    });

    return warehouse.rowsAffected > 0;
  }
}
