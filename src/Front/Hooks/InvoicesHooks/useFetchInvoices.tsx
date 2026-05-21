import type { Invoice, InvoicesValues } from "../../context/RecuderTypes/InvoiceReduce";
import { getInvoices, getInvoiesValues } from "../../services/invoicesHTTP";
import useInvoices from "../UseInvoices";


export function useFetchInvoices() {
  const { setInvoices,setInvoicesValues} = useInvoices();

  async function getInvoicesList() {
    try {
      const invoices: Invoice[] = await getInvoices();
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

  return { getInvoicesList, getInvoicesValuesObj};
}
