import { useFetchSalesItems } from "../../Hooks/SellsHooks/useFetchSales";
import useWarehouse from "../../Hooks/UseWarehouse";

import {
  calculateIVA,
  calculatePrice,
  CalculateTotal,
} from "../../Utils/SalesUtils";

export function SalesPrices() {
  const { selectWarehouseSalesId, currentSale } = useWarehouse();
  const { completeCurrentSale } = useFetchSalesItems();

  return (
    <div className="sales_prices_resume">
      <section className="sub_total">
        <p>sub total</p>
        <p>{calculatePrice(currentSale).toFixed(2)}</p>
      </section>
      <section className="iva">
        <p>IVA 21%</p>
        <p>{calculateIVA(calculatePrice(currentSale)).toFixed(2)}</p>
      </section>
      <section className="total">
        <p>TOTAL</p>
        <p>
          {CalculateTotal(
            calculatePrice(currentSale),
            calculateIVA(calculatePrice(currentSale)),
          ).toFixed(2)}
        </p>
      </section>
      <div className="action_buttons_sales">
        <button onClick={() => console.log(currentSale)}>Cotizacion</button>
        <button
          onClick={() =>
            completeCurrentSale(currentSale, selectWarehouseSalesId)
          }
        >
          Venta
        </button>
      </div>
    </div>
  );
}
