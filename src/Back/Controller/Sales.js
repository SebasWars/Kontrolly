import { SalesModel } from "../model/Sales.js";

export class SalesController {
  static async getItems(req, res) {
    const { id } = req.params;
    const items = await SalesModel.getItems({ id });

    if (!items) {
      return res.status(404).json({ message: "No items found" });
    }

    return res.status(200).json(items);
  }

  static async createSell(req,res){
    const {id} = req.params;
    const {items, type} = req.body;
    const updateStock = await SalesModel.createSell({id, items, type});

    if(!updateStock){
      return res.status(404).json({message: 'It was not possible to complete the sale'});
    }

    return res.status(200).json({
      message: 'Items sold!',
      items: updateStock
    })
  }
}
