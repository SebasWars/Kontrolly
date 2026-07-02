import { useEffect } from "react";
import { useFetchClients } from "../../Hooks/ClientsHooks/useFetchClients";
import { useClients } from "../../Hooks/UseClients";

interface PropTypes {
  toogleForm: (val:boolean) => void;
  invoiceID: string;
  invoiceDate: string;
}

export function InvoiceDetails({ toogleForm, invoiceID, invoiceDate }: PropTypes) {
  const formDate = invoiceDate.slice(0, 10);
  const { clientsResume } = useClients();
  const {clientsResumes} = useFetchClients()

  useEffect(() => {
    clientsResumes()
  },[])

  return (
    <header className="invoice_details_header">
      <section className="client_section">
        <label htmlFor="">Informacion del cliente</label>
        <div className="client_selector">
          <select name="" id="">
            <option value="">-- Selecciona un cliente --</option>
            {clientsResume.map((client) => {
              const { id, companyName } = client;
              return (
                <option key={id} value={companyName}>
                  {companyName}
                </option>
              );
            })}
          </select>
          <button onClick={() => toogleForm(true)}>Nuevo cliente</button>
        </div>
      </section>

      <section className="invoice_details">
        <label htmlFor="invoice-id">
          <p>Factura ID</p>
          <input id="invoice-id" readOnly type="text" value={invoiceID} />
        </label>

        <label htmlFor="invoice-date">
          <p>Fecha de facturacion</p>
          <input id="invoice-date" readOnly type="text" value={formDate} />
        </label>
      </section>
    </header>
  );
}
