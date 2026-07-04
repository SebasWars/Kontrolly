import { useEffect } from "react";
import { useFetchClients } from "../../Hooks/ClientsHooks/useFetchClients";
import { useClients } from "../../Hooks/UseClients";
import type { InvoiceDetails } from "../../context/RecuderTypes/InvoiceReduce";

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
          <select onChange={currentClietnHandler} name="" id="">
            <option value="">-- Selecciona un cliente --</option>
            {clientsResume.map((client) => {
              const { id, companyName } = client;
              return (
                <option key={id} value={id}>
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
