import { useEffect } from "react";
import { SalesItemsGrid } from "../components/sales/SalesItemsGrid";
import { SalesResume } from "../components/sales/SalesResume";
import { SalesSearch } from "../components/sales/SalesSearch";
import { useFetchWarehouses } from "../Hooks/StockHooks/useFetchWarehouses";

import "../styles/sales.css";
import useSales from "../Hooks/UseSales";
import { PopUp } from "../components/UI/PopUp";

function Sells() {
  const { selectWarehouseSalesId, itemsSales } = useSales();
  const { fetchWarehouses } = useFetchWarehouses();

  useEffect(() => {
    fetchWarehouses();
  }, [selectWarehouseSalesId, itemsSales]);

  return (
    <div className="sales_container">
      <PopUp/>
      <section className="sales_left_container">
        <SalesSearch />
        <SalesItemsGrid />
      </section>
      <SalesResume />
    </div>
  );
}

export default Sells;
