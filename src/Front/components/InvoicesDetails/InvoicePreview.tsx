import { useNavigate } from "react-router-dom";
import useInvoices from "../../Hooks/UseInvoices";
import { useFetchInvoices } from "../../Hooks/InvoicesHooks/useFetchInvoices";

export function PDFPreview() {
  const { invoiceDetails } = useInvoices();
  const { updateInvoiceF } = useFetchInvoices();
  const navigate = useNavigate();

  const sendUpdate = () => {
    navigate("/facturas");
    updateInvoiceF(invoiceDetails.id, invoiceDetails);
  };

  return (
    <div className="pdf_preview_container">
      <button
        onClick={() => navigate("/facturas")}
        className="cancel_invoice_modification"
      >
        Volver
      </button>
      <div className="pdf"></div>
      <div className="invoice_pdf_action_buttons">
        {invoiceDetails.state === "price" ? <button>Vender</button> : ""}
        <button onClick={sendUpdate}>Guardar</button>
        <button>PDF</button>
      </div>
    </div>
  );
}
