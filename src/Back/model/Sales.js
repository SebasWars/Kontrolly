import { SalesRegister, Stocks } from "../MockData_Back.js";

export class salesModel {
  static async getItems({ id }) {
    const warehouse = Stocks.find((W) => W.id === id);

    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    const itemsData = warehouse.items.map((item) => ({
      id: item.id,
      name: item.name,
      image_url: item.image_url,
      quantity: item.quantity,
      sales_price: item.sales_price,
    }));

    return itemsData;
  }

  static async createSell({ id, items }) {
    const warehouse = Stocks.find((W) => W.id === id);
    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    const getItem = (id) => warehouse.items.find((wItem) => wItem.id === id);

    for (const item of items) {
      const warehouseItem = getItem(item.id);

      if (!warehouseItem) {
        throw new Error(`Item ${item.id} not found`);
      }

      if (warehouseItem.quantity < item.quantity) {
        throw new Error(`Not enough stock for item: ${item.id}`);
      }
    }

    for (const item of items) {
      const warehouseItem = getItem(item.id);
      warehouseItem.quantity -= item.quantity;
    }

    const sale = {
      id: crypto.randomUUID(),
      warehouse: id,
      itemsSold: items,
    };

    SalesRegister.push(sale);
    return sale;
  }
}
