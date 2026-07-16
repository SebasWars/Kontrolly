import { randomUUID } from "crypto";
import { db } from "../App.js";
import { SalesRegister, Stocks } from "../MockData_Back.js";

export class SalesModel {
  static async getItems({ id, userID }) {
    const itemsData = await db.execute({
      sql: "SELECT i.id, i.name, i.image_url, i.quantity, i.sales_price FROM Items i JOIN Warehouse w ON w.id = i.warehouse_id WHERE i.warehouse_id = ? AND w.user_id = ?",
      args: [id, userID],
    });

    return itemsData.rows;
  }

  static async getItemsByQuery({ query, warehouseId, userID }) {
    const normalize = (text) => (text ?? "").trim().toLowerCase();
    const normalizeQuery = normalize(query);

    const items = await db.execute({
      sql: "SELECT i.id, i.name, i.image_url, i.quantity, i.sales_price FROM Items i JOIN Warehouse w ON w.id = i.warehouse_id WHERE i.warehouse_id = ? AND LOWER(i.name) LIKE ? AND w.user_id = ?",
      args: [warehouseId, `%${normalizeQuery}%`, userID],
    });

    return items.rows;
  }

  static async createSell({ id, items, type, userID }) {
    const tx = await db.transaction("write");

    try {
      const warehouseResult = await tx.execute({
        sql: "SELECT id FROM Warehouse WHERE id = ? AND user_id = ?",
        args: [id, userID],
      });

      if (warehouseResult.rows.length === 0) {
        throw new Error("Warehose not found");
      }

      let total = 0;
      let saleItemsToInsert = [];

      for (const item of items) {
        const itemsResult = await tx.execute({
          sql: "SELECT i.id, i.quantity, i.sales_price, i.purchase_price FROM Items i JOIN Warehouse w ON w.id = i.warehouse_id WHERE i.id = ? AND i.warehouse_id = ? AND w.user_id = ?",
          args: [item.id, id, userID],
        });
        const warehouseItem = itemsResult.rows[0];

        if (!warehouseItem) {
          throw new Error(`Item ${item.id} not found`);
        }

        if (warehouseItem.quantity < item.quantity) {
          throw new Error(`Not enough stock for item: ${item.id}`);
        }

        total += item.quantity * warehouseItem.sales_price;
        saleItemsToInsert.push({
          itemId: warehouseItem.id,
          quantity: item.quantity,
          unitPrice: warehouseItem.sales_price,
          purchasePrice: warehouseItem.purchase_price,
        });
      }

      const saleId = randomUUID();
      await tx.execute({
        sql: "INSERT INTO Sales (id, state, warehouse_id, client_id, total, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        args: [saleId, type, id, null, total, new Date().toISOString()],
      });

      for (const saleItem of saleItemsToInsert) {
        await tx.execute({
          sql: "INSERT INTO Sales_items (id, sale_id, item_id, quantity, unit_price, purchase_price) VALUES (?, ?, ?, ?, ?, ?)",
          args: [
            randomUUID(),
            saleId,
            saleItem.itemId,
            saleItem.quantity,
            saleItem.unitPrice,
            saleItem.purchasePrice,
          ],
        });

        await tx.execute({
          sql: "UPDATE Items SET quantity = quantity - ? WHERE id = ?",
          args: [saleItem.quantity, saleItem.itemId],
        });
      }

      await tx.commit();
      return {
        id: saleId,
        state: type,
        warehouseId: id,
        total,
        items: saleItemsToInsert,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      await tx.rollback();
      throw error;
    }
  }
}
