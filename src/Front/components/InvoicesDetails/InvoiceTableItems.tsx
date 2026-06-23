import type { InvoiceItems } from "../../Types/ModifyInvoiceTypes";
import { InvoiceTableRows } from "./InvoiceTableRows";

interface PropType {
  invoiceItems: InvoiceItems[];
  addOne: (id: string) => void
  removeOne: (id: string) => void
  removeItem: (id: string) => void
}

export function InvoiceTableItems({ invoiceItems, addOne, removeOne, removeItem }: PropType) {
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
                  addOne={addOne}
                  removeOne={removeOne}
                  removeItem={removeItem}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
