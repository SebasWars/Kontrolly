import { useEffect } from "react";
import type {
  Invoice,
  InvoiceDetails,
  InvoicesValues,
} from "../../context/RecuderTypes/InvoiceReduce";
import {
  getInvoice,
  getInvoicesByType,
  getInvoiesValues,
  getPDF,
  updateInvoice,
} from "../../services/invoicesHTTP";
import useInvoices from "../UseInvoices";

export function useFetchInvoices() {
  const { setInvoices, setInvoicesValues, invoices } = useInvoices();

  async function getInvoicesType(type: "all" | "sold" | "price") {
    try {
      const invoices: Invoice[] = await getInvoicesByType(type);
      setInvoices(invoices);
    } catch (error) {
      throw new Error("Error loading invoices");
    }
  }

  async function getInvoiceById(id: string) {
    try {
      const invoice = await getInvoice(id);
      return invoice;
    } catch (error) {
      throw new Error("Error loading invoice details");
    }
  }

  async function getInvoicesValuesObj() {
    try {
      const invoicesValues: InvoicesValues = await getInvoiesValues();
      setInvoicesValues(invoicesValues);
    } catch (error) {
      throw new Error("Error loading values");
    }
  }

  async function updateInvoiceF(id: string, invoice: InvoiceDetails) {
    try {
      await updateInvoice(id, invoice);
      await getInvoicesType("all");
      await getInvoicesValuesObj();
      console.log(invoices);
    } catch (error) {
      throw new Error("Something went wrong, try again.");
    }
  }

  async function generatePDF(id: string, invoice: InvoiceDetails) {
    try {
      await getPDF(id, invoice)
    } catch (error) {
      throw new Error("It was no possible to generate the PDF.");
    }
  }

  useEffect(() => {
    getInvoicesType("all");
    getInvoicesValuesObj();
  }, []);

  return {
    getInvoicesValuesObj,
    getInvoicesType,
    getInvoiceById,
    updateInvoiceF,
    generatePDF,
  };
}
