import { salesModel } from "../model/Sales.js";

export class SalesController {
  static async getItems(req, res) {
    const { id } = req.params;
    const items = await salesModel.getItems({ id });

    if (!items) {
      return res.status(404).json({ message: "No items found" });
    }

    return res.status(200).json(items);
  }
}
