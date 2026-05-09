import { SalesItemsGrid } from "../components/sales/SalesItemsGrid";
import { SalesResume } from "../components/sales/SalesResume";
import { SalesSearch } from "../components/sales/SalesSearch";

import "../styles/sales.css";

function Sells() {
  return (
    <div className="sales_container">
      <section className="sales_left_container">
        <SalesSearch />
        <SalesItemsGrid />
      </section>
      <SalesResume/>
    </div>
  );
}

export default Sells;
