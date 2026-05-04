import { ItemsModel } from "../model/Items.js";

export class ItemsController {
  static async createItem(req, res) {
    const { id } = req.params;

    const file = req.file;
    const { name, description, quantity, purchase_price, sales_price } =
      req.body;

    const newItem = await ItemsModel.createItem({
      id,
      name,
      description,
      quantity: Number(quantity),
      purchase_price: Number(purchase_price),
      sales_price: Number(sales_price),
      file,
    });

    return res.status(201).json({ message: "New item created", item: newItem });
  }

  static async modifyItem(req, res) {
    const { warehouseID, itemID } = req.params;

    const file = req.file;
    const { name, description, quantity, purchase_price, sales_price } =
      req.body;

    const itemUpdated = await ItemsModel.modifyItem({
      warehouseID,
      itemID,
      name,
      description,
      quantity: Number(quantity),
      purchase_price: Number(purchase_price),
      sales_price: Number(sales_price),
      file,
    });

    return res.status(200).json({ message: "Item updated", item: itemUpdated });
  }

  static async deleteItem(req, res) {
    const { warehouseID, itemID } = req.params;
    const itemRemoved = await ItemsModel.deleteItem({ warehouseID, itemID });
    if (!itemRemoved) {
      return res.status(404).json({ message: "Item non-existent" });
    }
    return res.status(202).json({ message: "Item removed" });
  }
}
