import { useEffect } from "react";
import { SalesItemsGrid } from "../components/sales/SalesItemsGrid";
import { SalesResume } from "../components/sales/SalesResume";
import { SalesSearch } from "../components/sales/SalesSearch";
import { useFetchWarehouses } from "../Hooks/StockHooks/useFetchWarehouses";
import useWarehouse from "../Hooks/UseWarehouse";

import "../styles/sales.css";
import { PopUp } from "../components/UI/PopUp";

function Sells() {
  const { selectWarehouseSalesId, warehouseItems } = useWarehouse();
  const { fetchWarehouses } = useFetchWarehouses();

  useEffect(() => {
    fetchWarehouses();
  }, [selectWarehouseSalesId, warehouseItems]);

  return (
    <div className="sales_container">
      <section className="sales_left_container">
        <SalesSearch />
        <PopUp/>
        <SalesItemsGrid />
      </section>
      <SalesResume />
    </div>
  );
}

export default Sells;
