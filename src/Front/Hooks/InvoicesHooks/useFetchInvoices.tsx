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
  updateInvoice,
  updateInvoiceState,
} from "../../services/invoicesHTTP";
import useInvoices from "../UseInvoices";

export function useFetchInvoices() {
  const { setInvoices, setInvoicesValues } = useInvoices();

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
      await getInvoicesValuesObj();
    } catch (error) {
      throw new Error("Something went wrong, try again.");
    }
  }

  async function updateInvState(id: string, state: "sold" | "price") {
    try {
      await updateInvoiceState(id, state);
      await getInvoicesValuesObj();
    } catch (error) {
      throw new Error("It was not possible to update the invoice state");
    }
  }

  useEffect(() => {
    getInvoicesValuesObj();
  }, []);

  return {
    getInvoicesValuesObj,
    getInvoicesType,
    getInvoiceById,
    updateInvoiceF,
    updateInvState,
  };
}
