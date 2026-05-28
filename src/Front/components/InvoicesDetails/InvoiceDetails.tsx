export function InvoiceDetails() {
  return (
    <header className="invoice_details_header">
      <section className="client_section">
        <label htmlFor="">Informacion del cliente</label>
        <div className="client_selector">
          <select name="" id="">
            <option value="">-- Selecciona un alamcen --</option>
            <option value="">Coffe first</option>
            <option value="">Nintendo Es</option>
            <option value="">Dulce hermosa</option>
          </select>
          <button>Nuevo cliente</button>
        </div>
      </section>

      <section className="invoice_details">
        <label htmlFor="invoice-id">
          <p>Factura ID</p>
          <input id="invoice-id" readOnly type="text" value={1234} />
        </label>

        <label htmlFor="invoice-date">
          <p>Fecha de facturacion</p>
          <input id="invoice-date" readOnly type="text" value={"1 marzo 2026"} />
        </label>
      </section>
    </header>
  );
}
