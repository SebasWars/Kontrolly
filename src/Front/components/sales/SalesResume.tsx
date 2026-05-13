import useWarehouse from "../../Hooks/StockHooks/UseWarehouse";
import { SaleItem } from "./SaleItem";
import { SalesPrices } from "./SalePrices";

export function SalesResume() {
  const { currentSale } = useWarehouse();
  return (
    <div className="sales_resume_container">
      <h2>Resumen de compras</h2>

      <div className="curren_sale">
        <SaleItem saleItems={currentSale} />
      </div>
      <SalesPrices />
    </div>
  );
}
