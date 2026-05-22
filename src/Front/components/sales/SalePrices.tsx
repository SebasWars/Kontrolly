import { useFetchSalesItems } from "../../Hooks/SellsHooks/useFetchSales";
import useSales from "../../Hooks/UseSales";

import {
  calculateIVA,
  calculatePrice,
  CalculateTotal,
} from "../../Utils/SalesUtils";

export function SalesPrices() {
  const { selectWarehouseSalesId, currentSale } = useSales();
  const { completeCurrentSale } = useFetchSalesItems();

  function closeSale(type: 'sold' | 'price') {
    completeCurrentSale(currentSale, selectWarehouseSalesId, type);
    if (currentSale.length > 0) {
    }
  }

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
        <button onClick={() => closeSale('price')}>Cotizacion</button>
        <button onClick={() => closeSale('sold')}>Venta</button>
      </div>
    </div>
  );
}
