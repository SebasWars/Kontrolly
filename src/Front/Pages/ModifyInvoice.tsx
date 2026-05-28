import { InvoiceDetails } from "../components/InvoicesDetails/InvoiceDetails";
import { PDFPreview } from "../components/InvoicesDetails/InvoicePreview";
import { InvoiceTableItems } from "../components/InvoicesDetails/InvoiceTableItems";
import '../styles/modifyInvoice.css'

export function ModifyInvoice() {
  return (
    <div className="modify_invoice_main_container">
      <div className="invoice_details_main_container">
        <InvoiceDetails />
        <InvoiceTableItems/>
      </div>
      <div className="invoice_preview_container">
        <PDFPreview/>
      </div>
    </div>
  );
}
