import type { InvoiceItems } from "../context/RecuderTypes/InvoiceReduce";
import useInvoices from "../Hooks/UseInvoices";
import "../styles/PDF.css";

export function PDF() {
  const { invoiceDetails } = useInvoices();

  const calculateTotal = (arr: InvoiceItems[]) => {
    const price = arr.reduce(
      (acc, item) => acc + item.quantity * item.sales_price,
      0,
    );
    return price;
  };

  const calculateIVA = (val: number) => {
    return (val * 21) / 100;
  };

  return (
    <div className="PDF_CONTAINER">
      <header className="PDF_CONTAINER_HEADER">
        <div className="INVOICE">
          <h1>FACTURA</h1>
          <p>{invoiceDetails.id}</p>
        </div>
      </header>
      <div className="personal_data">
        <div className="data clien_data">
          <h2>Datos del cliente</h2>
          <p>nombre</p>
          <p>email</p>
          <p>telefono</p>
          <p>direccion</p>
        </div>
        <div className="data company_data">
          <h2>Datos de la compañia</h2>
          <p>nombre</p>
          <p>email</p>
          <p>telefono</p>
          <p>direccion</p>
        </div>
      </div>

      <table className="pdf_preview_table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceDetails.itemsList.map((item) => {
            const { name, quantity, sales_price } = item;
            return (
              <tr>
                <td>{name}</td>
                <td>{quantity}</td>
                <td>{sales_price}</td>
                <td>{sales_price * quantity}</td>
              </tr>
            );
          })}
          <tr className="summary_row">
            <td colSpan={2}></td>
            <td>sub total</td>
            <td>{calculateTotal(invoiceDetails.itemsList)}</td>
          </tr>
          <tr className="summary_row">
            <td colSpan={2}></td>
            <td>IVA 21%</td>
            <td>{calculateIVA(calculateTotal(invoiceDetails.itemsList))}</td>
          </tr>
          <tr className="total_row">
            <td colSpan={2}></td>
            <td>TOTAL</td>
            <td>
              {calculateTotal(invoiceDetails.itemsList) +
                calculateIVA(calculateTotal(invoiceDetails.itemsList))}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="notes">
        <p>Notas:</p>
      </div>
    </div>
  );
}
