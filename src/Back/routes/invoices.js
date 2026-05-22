import { Router } from "express";
import { InvoicesController } from "../Controller/Invoices.js";

export const invoicesRoute = Router();

invoicesRoute.get('/values', InvoicesController.getInvoicesValues)
invoicesRoute.get('/type/:type', InvoicesController.getInvoicesByType)
invoicesRoute.delete('/:id', InvoicesController.deleteInvoice)