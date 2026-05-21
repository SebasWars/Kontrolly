import { useEffect } from "react";
import { InvoicesHeaderOptions } from "../components/invoices/InvoicesHeaderOptions";
import { InvoicesResumeInformation } from "../components/invoices/InvoicesResumeInfo/InvoicesResumeInformation";
import { InvoicesTable } from "../components/invoices/InvoicesTable";
import { useFetchInvoices } from "../Hooks/InvoicesHooks/useFetchInvoices";

import "../styles/invoices.css";

function Invoices() {
  const { getInvoicesList, getInvoicesValuesObj } = useFetchInvoices();

  useEffect(() => {
    getInvoicesList();
    getInvoicesValuesObj()
  }, []);

  return (
    <div className="invoices_main_container">
      <h1>Facturas</h1>
      <header className="invoices_title">
        <InvoicesHeaderOptions />
        <InvoicesResumeInformation />
      </header>

      <div className="invoices_table_container">
        <div className="table_title">
          <h3>Resumen de facturas</h3>
          <div className="table_filters">
            <button className="sort">ordenar</button>
            <input type="text" placeholder="Bucar..." />
          </div>
        </div>
        <InvoicesTable />
      </div>
    </div>
  );
}

export default Invoices;
