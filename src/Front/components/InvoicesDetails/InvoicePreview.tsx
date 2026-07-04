import { useNavigate } from "react-router-dom";
import useInvoices from "../../Hooks/UseInvoices";
import { useFetchInvoices } from "../../Hooks/InvoicesHooks/useFetchInvoices";
import { PDF } from "../../Pages/PDFPreview";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoiceDocument } from "../../PDF";
import { useClients } from "../../Hooks/UseClients";

export function PDFPreview() {
  const { invoiceDetails } = useInvoices();
  const { updateInvoiceF, updateInvState } = useFetchInvoices();
  const { client } = useClients();
  const navigate = useNavigate();

  const sendUpdate = () => {
    navigate("/facturas");
    updateInvoiceF(invoiceDetails.id, invoiceDetails);
  };

  const updateState = (state: "sold" | "price") => {
    navigate("/facturas");
    updateInvState(invoiceDetails.id, state);
  };

  return (
    <div className="pdf_preview_container">
      <button
        onClick={() => navigate("/facturas")}
        className="cancel_invoice_modification"
      >
        Volver
      </button>
      <div className="pdf">
        <PDF />
      </div>
      <div className="invoice_pdf_action_buttons">
        {invoiceDetails.state === "price" ? (
          <button onClick={() => updateState("sold")}>Vender</button>
        ) : (
          ""
        )}
        <button onClick={sendUpdate}>Guardar</button>
        <PDFDownloadLink
          className="pdf_button"
          onClick={() => updateInvoiceF(invoiceDetails.id, invoiceDetails)}
          document={<InvoiceDocument invoiceDetails={invoiceDetails} client={client}/>}
          fileName={`factura-${invoiceDetails.warehouseName}-${invoiceDetails.id}.pdf`}
        >
          <span>Descargar PDF</span>
        </PDFDownloadLink>
      </div>
    </div>
  );
}
