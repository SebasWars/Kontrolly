import { Stocks } from "../MockData_Back.js";

export class salesModel {
  static async getItems({ id }) {
    const warehouse = Stocks.find((W) => W.id === id);

    if(!warehouse) return null;

    const itemsData = warehouse.items.map((item) => ({
      id: item.id,
      name: item.name,
      image_url:item.image_url,
      quantity: item.quantity,
      sales_price: item.sales_price
    }))

    return itemsData;
  }
}
