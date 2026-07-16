import { SalesModel } from "../model/Sales.js";

export class SalesController {
  static async getItems(req, res) {
    const { id } = req.params;
    const userID = req.user.id;
    const items = await SalesModel.getItems({ id, userID });

    if (!items) {
      return res.status(404).json({ message: "No items found" });
    }

    return res.status(200).json(items);
  }

  static async getItemsByQuery(req, res) {
    const { query, warehouseId } = req.params;
    const userID = req.user.id;
    const items = await SalesModel.getItemsByQuery({
      query,
      warehouseId,
      userID,
    });

    if (!items) {
      return res.status(404).json({ message: "There are no matches" });
    }

    return res.status(200).json(items);
  }

  static async createSell(req, res) {
    const { id } = req.params;
    const { items, type } = req.body;
    const userID = req.user.id;
    const updateStock = await SalesModel.createSell({ id, items, type, userID});

    if (!updateStock) {
      return res
        .status(404)
        .json({ message: "It was not possible to complete the sale" });
    }

    return res.status(200).json({
      message: "Items sold!",
      items: updateStock,
    });
  }
}
