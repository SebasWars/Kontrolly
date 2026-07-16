import { randomUUID } from "node:crypto";
import { db, PORT } from "../App.js";

export class ItemsModel {
  static async createItem({
    userID,
    id,
    name,
    description,
    quantity,
    purchase_price,
    sales_price,
    file,
  }) {
    const ownerCheck = await db.execute({
      sql: "SELECT id FROM Warehouse WHERE id = ? AND user_id = ?",
      args: [id, userID],
    });

    if (ownerCheck.rows.length === 0) {
      throw new Error("Warehouse not found or access denied");
    }

    const itemId = randomUUID();
    const image_url = file
      ? `http://localhost:${PORT}/uploads/${file.filename}`
      : null;

    await db.execute({
      sql: "INSERT INTO Items (id ,warehouse_id, name, image_url, description, quantity, purchase_price, sales_price) VALUES (?, ?, ?, ?, ?, ? , ?, ?)",
      args: [
        itemId,
        id,
        name,
        image_url,
        description,
        quantity,
        purchase_price,
        sales_price,
      ],
    });

    return {
      id: itemId,
      warehouseId: id,
      name,
      description,
      quantity,
      purchase_price,
      sales_price,
      image_url,
    };
  }

  static async modifyItem({
    userID,
    warehouseID,
    itemID,
    name,
    description,
    quantity,
    purchase_price,
    sales_price,
    file,
  }) {
    const image_url = file
      ? `http://localhost:${PORT}/uploads/${file.filename}`
      : null;

    const item = await db.execute({
      sql: `UPDATE Items SET name = ?, description = ?, quantity = ?, purchase_price= ?, sales_price = ? ${file ? ", image_url = ?" : ""} WHERE id = ? AND warehouse_id = ? AND warehouse_id IN (SELECT id FROM Warehouse WHERE user_id = ?)`,
      args: file
        ? [
            name,
            description,
            Number(quantity ?? 0),
            Number(purchase_price),
            Number(sales_price),
            image_url,
            itemID,
            warehouseID,
            userID
          ]
        : [
            name,
            description,
            Number(quantity ?? 0),
            Number(purchase_price),
            Number(sales_price),
            itemID,
            warehouseID,
            userID
          ],
    });

    return item.rowsAffected > 0;
  }

  static async deleteItem({ warehouseID, itemID, userID }) {
    const item = await db.execute({
      sql: "DELETE FROM Items WHERE id = ? AND warehouse_id = ? AND warehouse_id IN (SELECT id FROM Warehouse WHERE user_id = ?)",
      args: [itemID, warehouseID, userID],
    });
    return item.rowsAffected > 0;
  }
}
