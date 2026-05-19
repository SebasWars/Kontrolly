import type { Invoice } from "../../context/RecuderTypes/InvoiceReduce";
import { getInvoices } from "../../services/invoicesHTTP";
import useInvoices from "../UseInvoices";


export function useFetchInvoices() {
  const { setInvoices} = useInvoices();

  async function getInvoicesList() {
    try {
      const invoices: Invoice[] = await getInvoices();
      setInvoices(invoices);
    } catch (error) {
        throw new Error("Error loading invoices");
    }
  }

  return { getInvoicesList };
}
