import useInvoices from "../../../Hooks/UseInvoices";
import { InvoiceBox } from "./InvoiceBox";

export function InvoicesResumeInformation() {
  const {invoicesValues} = useInvoices()
  const {totalCombined, combinedLastUpdate, totalSold, soldLastUpdate ,totalPrice , priceLastUpdate} = invoicesValues
  return (
    <div className="invoices_resume_information">
      <InvoiceBox type="Todas" total={totalCombined} lastUpdate={combinedLastUpdate}/>
      <InvoiceBox  type="Ventas" total={totalSold} lastUpdate={soldLastUpdate}/>
      <InvoiceBox  type="Cotización" total={totalPrice} lastUpdate={priceLastUpdate}/>
    </div>
  );
}
