import { InvoicesModel } from "../model/Invoices.js";

export class InvoicesController {
  static async getInvoicesByType(req, res) {
    try {
      const { type } = req.params;
      const invoices = await InvoicesModel.getInvoicesByType(type);
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

  static async deleteInvoice(req, res) {
    try {
      const { id } = req.params;
      const invoice = await InvoicesModel.deleteInvoice({ id });
      return res.status(202).json({message: 'Invoice removed'})
    } catch (error) {
      return res.status(404).json({ message: "Invoice not found" });
    }
  }
}
