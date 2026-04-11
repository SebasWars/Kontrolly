import type { ModifyFormData, NewItem } from "../../Types/StockTypes";

type Props = {
  formData: NewItem;
  modifyFormData: ModifyFormData;
};

function Fees({ formData, modifyFormData }: Props) {
  function calculateTotal(
    sale_price: number | "",
    purchase_price: number | "",
    quantity: number | "",
  ): number {
    if (sale_price === "" || purchase_price === "" || quantity === "") return 0;
    return (purchase_price - sale_price) * quantity;
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
              onChange={(e) =>
                modifyFormData(
                  "purchase_price",
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
              type="number"
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              min={0}
            />
          </label>
          <label>
            Cantidad
            <input
              value={formData.quantity}
              onChange={(e) =>
                modifyFormData(
                  "quantity",
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
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
              onChange={(e) =>
                modifyFormData(
                  "sales_price",
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
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
