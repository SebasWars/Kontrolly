import { randomUUID } from "node:crypto";
import { PORT } from "../App.js";
import { Stocks } from "../MockData_Back.js";

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
    const warehouse = Stocks.find((W) => W.id === id);

    if (!warehouse) return false;

    const newItem = {
      id: randomUUID(),
      name,
      description,
      quantity,
      purchase_price,
      sales_price,
      image_url: file
        ? `http://localhost:${PORT}/uploads/${file.filename}`
        : null,
    };

    warehouse.items.push(newItem);
    return newItem
  }
}
