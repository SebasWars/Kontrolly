import { SaleItem } from "./SaleItem";
import { SalesPrices } from "./SalePrices";

export function SalesResume() {
  return (
    <div className="sales_resume_container">
      <h2>Resumen de compras</h2>
      <div className="curren_sale">
        <SaleItem/>
      </div>
      <SalesPrices/>
    </div>
  );
}
