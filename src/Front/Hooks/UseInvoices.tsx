import { useContext } from "react";
import { InvoicesContext } from "../context/Providers/InvoiceProvider";

function useInvoices() {
  const context = useContext(InvoicesContext);
  if (!context) {
    throw new Error('Context could not be found');
  }
  return context;
}

export default useInvoices;
