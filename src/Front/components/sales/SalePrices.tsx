import type { SaleItems } from "../../Types/SalesTypes";
import {
  calculateIVA,
  calculatePrice,
  CalculateTotal,
} from "../../Utils/SalesUtils";

interface Props {
  currentSale: SaleItems[];
}

export function SalesPrices({ currentSale }: Props) {
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
        <button>Cotizacion</button>
        <button>Venta</button>
      </div>
    </div>
  );
}
