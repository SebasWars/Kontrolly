export function PDFPreview() {
  return (
    <div className="pdf_preview_container">
      <button className="cancel_invoice_modification">cancel</button>
      <div className="pdf"></div>
      <div className="invoice_pdf_action_buttons">
        <button>Vender</button>
        <button>Guardar</button>
        <button>PDF</button>
      </div>
    </div>
  );
}
