import { InvoiceDetails } from "../components/invoicesDetails/InvoiceDetails";
import { PDFPreview } from "../components/invoicesDetails/InvoicePreview";
import { InvoiceTableItems } from "../components/invoicesDetails/InvoiceTableItems";
import "../styles/modifyInvoice.css";

import useInvoices from "../Hooks/UseInvoices";
import { useInvoice } from "../Hooks/InvoicesHooks/useInvoice";

export function ModifyInvoice() {
  const { invoiceDetails } = useInvoices();
  useInvoice();

  return (
    <div className="modify_invoice_main_container">
      <div className="invoice_details_main_container">
        <InvoiceDetails
          invoiceID={invoiceDetails.id}
          invoiceDate={invoiceDetails.createdAt}
        />
        <InvoiceTableItems invoiceItems={invoiceDetails.itemsList} />
      </div>
      <div className="invoice_preview_container">
        <PDFPreview />
      </div>
    </div>
  );
}
