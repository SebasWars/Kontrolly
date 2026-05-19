import { Router } from "express";
import { InvoicesController } from "../Controller/Invoices.js";

export const invoicesRoute = Router();

invoicesRoute.get('/', InvoicesController.getInvoices)