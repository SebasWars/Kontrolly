import type { PropsCreateItemChild } from "../../Types/StockTypes";

function Fees({ formData, modifyFormData }: PropsCreateItemChild) {
  function calculateTotal(
    sale_price: string,
    purchase_price: string,
    quantity: string,
  ): number {
    const sale = Number(sale_price);
    const purchase = Number(purchase_price);
    const qty = Number(quantity);
    if (sale_price === "" || purchase_price === "" || quantity === "") return 0;
    return (purchase - sale) * qty;
  }
  return (
    <div className="fee_information_container">
      <div className="title">
        <h2>Tarifas</h2>
        <p>Total y subtotal</p>
      </div>
      <div className="fee_information_information">
        <section>
          <label>
            Precio de compra
            <input
              value={formData.purchase_price}
              onChange={(e) => modifyFormData("purchase_price", e.target.value)}
              type="number"
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              min={0}
            />
          </label>
          <label>
            Cantidad
            <input
              value={formData.quantity}
              onChange={(e) => modifyFormData("quantity", e.target.value)}
              type="number"
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              min={0}
            />
          </label>
        </section>
        <section>
          <label>
            Precio de venta
            <input
              value={formData.sales_price}
              onChange={(e) => modifyFormData("sales_price", e.target.value)}
              type="number"
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              min={0}
            />
          </label>
          <label>
            Ganancias
            <input
              type="text"
              readOnly
              value={calculateTotal(
                formData.purchase_price,
                formData.sales_price,
                formData.quantity,
              )}
            />
          </label>
        </section>
      </div>
    </div>
  );
}

export default Fees;
