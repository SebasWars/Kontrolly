export function SalesPrices() {
  return (
    <div className="sales_prices_resume">
      <section className="sub_total">
        <p>sub total</p>
        <p>3000</p>
      </section>
      <section className="iva">
        <p>IVA 19%</p>
        <p>300</p>
      </section>
      <section className="total">
        <p>TOTAL</p>
        <p>3300</p>
      </section>
      <div className="action_buttons_sales">
        <button>Cotizacion</button>
        <button>Venta</button>
      </div>
    </div>
  );
}
