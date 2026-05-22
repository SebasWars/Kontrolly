import useInvoices from "../../Hooks/UseInvoices";
import { useSort } from "../../Hooks/UseSort";
import { TableRows } from "./TableRows";

export function InvoicesTable() {
  const { invoices } = useInvoices();
  const { handleSorted, sortedItems } = useSort(invoices);
  return (
    <div className="invoices_table">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSorted('id')} scope="col">Nº Factura</th>
            <th onClick={() => handleSorted('warehouseID')} scope="col">Nombre</th>
            <th onClick={() => handleSorted('date')} scope="col">Fecha</th>
            <th onClick={() => handleSorted('state')} scope="col">Estado</th>
            <th onClick={() => handleSorted('total')} scope="col">Precio</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {sortedItems?.map((invoice) => (
            <TableRows key={invoice.id} invoiceList={invoice} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
