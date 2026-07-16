import { InvoicesModel } from "../model/Invoices.js";

export class InvoicesController {
  static async getInvoicesByType(req, res) {
    try {
      const { type } = req.params;
      const userID = req.user.id
      const invoices = await InvoicesModel.getInvoicesByType(type, userID);
      return res.status(200).json(invoices);
    } catch (error) {
      return res.status(404).json({ message: "Invoices not found" });
    }
  }

  static async getInvoicesValues(req, res) {
    try {
      const userID = req.user.id
      const invoicesValues = await InvoicesModel.getInvoicesValues(userID);
      return res.status(200).json(invoicesValues);
    } catch (error) {
      return res
        .status(404)
        .json({ masagge: "It was not possible to acces to the data" });
    }
  }

  static async getinvoiceByID(req, res) {
    try {
      const { id } = req.params;
      const userID = req.user.id
      const invoice = await InvoicesModel.getinvoiceByID(id, userID);
      return res.status(200).json(invoice);
    } catch (error) {
      return res.status(404).json({ messgae: "Invoice not found" });
    }
  }

  static async updateInvoice(req, res) {
    try {
      const invoice = req.body;
      const { id } = req.params;
      const userID = req.user.id
      const invoiceUpdated = await InvoicesModel.updateInvoice(id, invoice, userID);
      return res
        .status(200)
        .json({ message: "Invoice was update succesfully" });
    } catch (error) {
      return res.status(406).json({ message: "Invoice could not be updated." });
    }
  }

  static async updateInvoiceState(req,res){
    try {
      const {id} = req.params;
      const newState = req.body
      const userID = req.user.id
      const invoice = await InvoicesModel.updateInvoiceState(id, newState, userID)
      return res.status(200).json(invoice);
    } catch (error) {
      return res.status(404).json({message: 'It was not possible update invoice state'})
    }
  }

  static async deleteInvoice(req, res) {
    try {
      const { id } = req.params;
      const userID = req.user.id
      const invoice = await InvoicesModel.deleteInvoice({ id, userID });
      return res.status(202).json({ message: "Invoice removed" });
    } catch (error) {
      return res.status(404).json({ message: "Invoice not found" });
    }
  }
}
