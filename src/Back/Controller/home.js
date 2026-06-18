import { homeModel } from "../model/home.js";

export class homeController {
  static async getFinances(req, res) {
    try {
      const financesRes = await homeModel.getFinances();
      return res.status(200).json(financesRes);
    } catch (error) {
      return res
        .status(404)
        .json({ message: "There was not possible to compilate finances" });
    }
  }

  static async getLastSales(req, res) {
    try {
      const sales = await homeModel.getLasSales();
      return res.status(200).json(sales);
    } catch (error) {
      return res
        .status(404)
        .json({ message: "There is not possible to get the sales" });
    }
  }

  static async getSales(req, res) {
    try {
      const { type } = req.query;
      const sales = await homeModel.getSalesByRequest(type);
      return res.status(200).json(sales);
    } catch (error) {
      return res.status(404).json({
        message: "It was not possible to compilate sales information",
      });
    }
  }
}
