import { InvoiceDetails } from "../components/invoicesDetails/InvoiceDetails";
import { PDFPreview } from "../components/invoicesDetails/InvoicePreview";
import { InvoiceTableItems } from "../components/invoicesDetails/InvoiceTableItems";
import "../styles/modifyInvoice.css";

import useInvoices from "../Hooks/UseInvoices";
import { useInvoice } from "../Hooks/InvoicesHooks/useInvoice";
import { useCreateClient } from "../Hooks/ClientsHooks/CreateNewClient";
import { AddNewClient } from "../components/ClientsC/AddNewClient";
import { useFetchClients } from "../Hooks/ClientsHooks/useFetchClients";
import { useClients } from "../Hooks/UseClients";
import { useEffect } from "react";

export function ModifyInvoice() {
  const { invoiceDetails } = useInvoices();
  const { clientForm, toggleForm } = useCreateClient();
  const { clientById } = useFetchClients();
  const { client, clearClient } = useClients();
  const isActive = clientForm ? "active" : "";

  const currentClietnHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      clearClient();
      return;
    }
    clientById(value);
  };

  useEffect(() => {
    console.log(client);
  }, [client]);
  useInvoice();

  return (
    <div className={`modify_invoice_main_container ${isActive}`}>
      <div className="invoice_details_main_container">
        <InvoiceDetails
          currentClietnHandler={currentClietnHandler}
          invoiceDetails={invoiceDetails}
          toogleForm={toggleForm}
          invoiceID={invoiceDetails.id}
          invoiceDate={invoiceDetails.createdAt}
        />
        <InvoiceTableItems invoiceItems={invoiceDetails.itemsList} />
      </div>
      {clientForm && <AddNewClient toggleForm={toggleForm} />}
      <div className="invoice_preview_container">
        <PDFPreview />
      </div>
    </div>
  );
}
