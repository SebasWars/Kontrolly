import type { Invoice, InvoicesValues } from "../../context/RecuderTypes/InvoiceReduce";
import { getInvoicesByType, getInvoiesValues } from "../../services/invoicesHTTP";
import useInvoices from "../UseInvoices";


export function useFetchInvoices() {
  const { setInvoices ,setInvoicesValues} = useInvoices();

  async function getInvoicesType(type: 'all' | 'sold' | 'price') {
    try {
      const invoices: Invoice[] = await getInvoicesByType(type);
      setInvoices(invoices);
    } catch (error) {
        throw new Error("Error loading invoices");
    }
  }

  async function getInvoicesValuesObj() {
    try {
      const invoicesValues: InvoicesValues = await getInvoiesValues();
      setInvoicesValues(invoicesValues)
    } catch (error) {
      throw new Error("Error loading values");
    }
  }

  return {  getInvoicesValuesObj, getInvoicesType};
}
