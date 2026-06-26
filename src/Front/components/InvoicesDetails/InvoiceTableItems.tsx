import type { InvoiceItems } from "../../context/RecuderTypes/InvoiceReduce";
import { InvoiceTableRows } from "./InvoiceTableRows";

interface PropType {
  invoiceItems: InvoiceItems[];
}

export function InvoiceTableItems({ invoiceItems }: PropType) {
  return (
    <div className="invoices_table_main_container">
      <h3>Lista de productos</h3>

      <div className="table_scroll">
        <table>
          <thead>
            <tr>
              <th>Productos</th>
              <th>Cantidad</th>
              <th>Precio U</th>
              <th>IVA</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.map((item) => {
              const { name, quantity, sales_price, id } = item;
              return (
                <InvoiceTableRows
                  key={id}
                  name={name}
                  id={id}
                  quantity={quantity}
                  sales_price={sales_price}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
