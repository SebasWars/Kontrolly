import { randomUUID } from "node:crypto";
import { db } from "../App.js";

export class StockModel {
  static async getWarehouses(userID) {
    const warehouses = await db.execute({
      sql: "SELECT id, warehouse FROM Warehouse WHERE user_id = ?",
      args: [userID],
    });
    return warehouses.rows;
  }

  static async getWarehouseByID(id, userID) {
    const warehouse = await db.execute({
      sql: "SELECT i.* FROM Items i JOIN Warehouse w ON w.id = i.warehouse_id WHERE i.warehouse_id = ? AND w.user_id = ?",
      args: [id, userID],
    });
    return warehouse.rows.length ? warehouse.rows : null;
  }

  static async createWarehouse({ warehouse, userID }) {
    const id = randomUUID();
    await db.execute({
      sql: "INSERT INTO Warehouse (id, warehouse, user_id) VALUES (?, ?, ?)",
      args: [id, warehouse, userID],
    });

    return { id, warehouse };
  }

  static async updateWarehosue({ id, warehouseName, userID }) {
    const currentWarehosue = await db.execute({
      sql: "UPDATE Warehouse SET warehouse = ? WHERE id = ? AND user_id = ?",
      args: [warehouseName, id, userID],
    });

    return currentWarehosue.rowsAffected > 0;
  }

  static async deleteWarehouse({ id, userID }) {
    const warehouse = await db.execute({
      sql: "DELETE FROM Warehouse WHERE id = ? AND user_id = ?",
      args: [id, userID],
    });

    return warehouse.rowsAffected > 0;
  }
}
