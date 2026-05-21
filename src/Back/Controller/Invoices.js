import { InvoicesModel } from "../model/Invoices.js";

export class InvoicesController {
  static async getInvoices(req, res) {
    try {
      const invoices = await InvoicesModel.getInvoices();

      return res.status(200).json(invoices);
    } catch (error) {
      return res.status(404).json({ message: "Invoices not found" });
    }
  }

  static async getInvoicesValues(req, res) {
    try {
      const invoicesValues = await InvoicesModel.getInvoicesValues();
      return res.status(200).json(invoicesValues);
    } catch (error) {
      return res
        .status(404)
        .json({ masagge: "It was not possible to acces to the data" });
    }
  }
}
