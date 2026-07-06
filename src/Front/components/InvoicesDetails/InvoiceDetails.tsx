import { useEffect } from "react";
import { useFetchClients } from "../../Hooks/ClientsHooks/useFetchClients";
import { useClients } from "../../Hooks/UseClients";
import type { InvoiceDetails } from "../../context/RecuderTypes/InvoiceReduce";
import useInvoices from "../../Hooks/UseInvoices";

interface PropTypes {
  invoiceDetails: InvoiceDetails;
  toogleForm: (val: boolean) => void;
  invoiceID: string;
  invoiceDate: string;
  currentClietnHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function InvoiceDetails({
  toogleForm,
  invoiceID,
  invoiceDate,
  currentClietnHandler,
}: PropTypes) {
  const formDate = invoiceDate.slice(0, 10);
  const { clientsResume, clearClient } = useClients();
  const { invoiceDetails } = useInvoices();
  const { clientsResumes } = useFetchClients();

  useEffect(() => {
    clientsResumes();
    return () => {
      clearClient();
    };
  }, []);

  return (
    <header className="invoice_details_header">
      <section className="client_section">
        <label htmlFor="">Informacion del cliente</label>
        <div className="client_selector">
          <select
            value={invoiceDetails.clientID || ""}
            onChange={currentClietnHandler}
          >
            <option value="">-- Selecciona un cliente --</option>

            {clientsResume.map((client) => (
              <option key={client.id} value={client.id}>
                {client.companyName}
              </option>
            ))}
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
