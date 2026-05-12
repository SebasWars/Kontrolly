import { useEffect } from "react";
import { SalesItemsGrid } from "../components/sales/SalesItemsGrid";
import { SalesResume } from "../components/sales/SalesResume";
import { SalesSearch } from "../components/sales/SalesSearch";
import { useFetchWarehouses } from "../Hooks/StockHooks/useFetchWarehouses";
import useWarehouse from "../Hooks/StockHooks/UseWarehouse";

import "../styles/sales.css";
import { useFetchSalesItems } from "../Hooks/SellsHooks/useFetchSales";

function Sells() {
  const { dispatch, selectWarehouseSalesId, itemsSales } = useWarehouse();
  const {getItemsforSale} = useFetchSalesItems()
  const { fetchWarehouses } = useFetchWarehouses();

  const handleSelectorSales = (value: string) => {
    dispatch({ type: "SET_WAREHOUSE_SALES", payload: value });
    getItemsforSale(value)
  };

  useEffect(() => {
    fetchWarehouses();
    console.log(itemsSales);
  }, [selectWarehouseSalesId]);

  return (
    <div className="sales_container">
      <section className="sales_left_container">
        <SalesSearch
          handleChange={handleSelectorSales}
          stockForSalesID={selectWarehouseSalesId || ""}
        />
        <SalesItemsGrid itemsSales={itemsSales}/>
      </section>
      <SalesResume />
    </div>
  );
}

export default Sells;
