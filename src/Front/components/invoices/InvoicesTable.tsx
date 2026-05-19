import useInvoices from "../../Hooks/UseInvoices";
import { TableRows } from "./TableRows";

export function InvoicesTable() {
  const { invoices } = useInvoices();
  return (
    <div className="invoices_table">
      <table>
        <thead>
          <tr>
            <th scope="col">Nº Factura</th>
            <th scope="col">Nombre</th>
            <th scope="col">Fecha</th>
            <th scope="col">Estado</th>
            <th scope="col">Precio</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <TableRows key={invoice.id} invoiceList={invoice}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}
