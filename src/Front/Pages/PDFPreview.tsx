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
  const subTotal = calculateTotal(invoiceDetails.itemsList);
  const IVA = calculateIVA(calculateTotal(invoiceDetails.itemsList));
  const total =
    calculateTotal(invoiceDetails.itemsList) +
    calculateIVA(calculateTotal(invoiceDetails.itemsList));

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
            const { name, quantity, sales_price, id } = item;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{quantity}</td>
                <td>{sales_price}</td>
                <td>{sales_price * quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="total_content_container">
        <section>
          <div className="sub_total">
            <p>Subtotal</p>
            <p>{subTotal}</p>
          </div>
          <div className="IVA">
            <p>IVA(12%)</p>
            <p>{IVA}</p>
          </div>
        </section>
        <div className="TOTAL">
          <p>Total:</p> 
          <p> {total}</p>
        </div>
      </div>
    </div>
  );
}
