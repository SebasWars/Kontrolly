import { useParams } from "react-router-dom";
import { useFetchInvoices } from "./useFetchInvoices";
import { useEffect } from "react";
import useInvoices from "../UseInvoices";

export function useInvoice() {
  const { getInvoiceById } = useFetchInvoices();
  const { setInvoiceDetails } = useInvoices();
  const { invoiceID } = useParams();

  useEffect(() => {
    const getInvoiceData = async () => {
      if (!invoiceID) return;
      const invoiceData = await getInvoiceById(invoiceID);
      setInvoiceDetails(invoiceData);
    };
    getInvoiceData();
  }, [invoiceID]);
}
