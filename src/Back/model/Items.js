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
    return newItem;
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
    const warehouse = Stocks.find((W) => W.id === warehouseID);
    if (!warehouse) return false;

    const item = warehouse.items.find((Item) => Item.id === itemID);
    if (!item) return false;

    item.name = name;
    item.description = description;
    item.quantity = Number(quantity ?? 0);
    item.purchase_price = Number(purchase_price);
    item.sales_price = Number(sales_price);

    if (file) {
      item.image_url = `http://localhost:${PORT}/uploads/${file.filename}`;
    }

    return item;
  }

  static async deleteItem({warehouseID, itemID}){
    const warehouse = Stocks.find((W) => W.id === warehouseID);
    const itemIndex = warehouse.items.findIndex((item) => item.id === itemID);

    if(itemIndex === -1) return false;

    warehouse.items.splice(itemIndex, 1);
    return true
  }
}
