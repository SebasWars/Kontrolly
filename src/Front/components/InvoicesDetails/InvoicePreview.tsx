import { useNavigate } from "react-router-dom";
import useInvoices from "../../Hooks/UseInvoices";

export function PDFPreview() {
  const { invoiceDetails } = useInvoices();
  const navigate = useNavigate();
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
        <button>Guardar</button>
        <button>PDF</button>
      </div>
    </div>
  );
}
