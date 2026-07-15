import { randomUUID } from "node:crypto";
import { db, PORT } from "../App.js";

export class ItemsModel {
  static async createItem({
    id,
    name,
    description,
    quantity,
    purchase_price,
    sales_price,
    file,
  }) {
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
      sql: `UPDATE Items SET name = ?, description = ?, quantity = ?, purchase_price= ?, sales_price= ?, ${file ? ", image_url = ?" : ""} WHERE id = ? AND warehouse_id = ?`,
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
          ]
        : [
            name,
            description,
            Number(quantity ?? 0),
            Number(purchase_price),
            Number(sales_price),
            itemID,
            warehouseID,
          ],
    });

    return item.rowsAffected > 0;
  }

  static async deleteItem({ warehouseID, itemID }) {
    const item = await db.execute({
      sql: "DELETE FROM Items WHERE id = ? AND warehouse_id = ?",
      args: [itemID, warehouseID],
    });
    return item.rowsAffected > 0;
  }
}
