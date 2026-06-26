import { useNavigate } from "react-router-dom";
import useInvoices from "../../Hooks/UseInvoices";
import { useFetchInvoices } from "../../Hooks/InvoicesHooks/useFetchInvoices";
import { PDF } from "../../Pages/PDFPreview";

export function PDFPreview() {
  const { invoiceDetails } = useInvoices();
  const { updateInvoiceF,generatePDF } = useFetchInvoices();
  const navigate = useNavigate();

  const sendUpdate = () => {
    navigate("/facturas");
    updateInvoiceF(invoiceDetails.id, invoiceDetails);
  };

  const getPDF = () => {
    generatePDF(invoiceDetails.id, invoiceDetails)
  }

  return (
    <div className="pdf_preview_container">
      <button
        onClick={() => navigate("/facturas")}
        className="cancel_invoice_modification"
      >
        Volver
      </button>
      <div className="pdf">
        <PDF/>
      </div>
      <div className="invoice_pdf_action_buttons">
        {invoiceDetails.state === "price" ? <button>Vender</button> : ""}
        <button onClick={sendUpdate}>Guardar</button>
        <button onClick={getPDF}>PDF</button>
      </div>
    </div>
  );
}
