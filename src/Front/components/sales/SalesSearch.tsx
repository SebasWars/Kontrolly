import Selector from "../stock/Selectors/Selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSalesActions } from "../../Hooks/SellsHooks/useSalesActions";
import useSales from "../../Hooks/UseSales";
import { useEffect, useState } from "react";
import { useFetchSalesItems } from "../../Hooks/SellsHooks/useFetchSales";

export function SalesSearch() {
  const { selectWarehouseSalesId } = useSales();
  const { getItemsforSale } = useFetchSalesItems();
  const { handleSelectorSales } = useSalesActions();
  const [query, setQuery] = useState("");

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setQuery(text);
  };

  useEffect(() => {
    if (!selectWarehouseSalesId) return;

    const timer = setTimeout(() => {
      if (query.trim().length > 0) {
        getItemsforSale(selectWarehouseSalesId, query);
      } else {
        getItemsforSale(selectWarehouseSalesId);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, selectWarehouseSalesId]);

  return (
    <div className="search_sales_title">
      <div className="search_item">
        <input type="text" value={query} onChange={handleQuery} />
        <button className="search_item_btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      <Selector
        warehouse={selectWarehouseSalesId || ""}
        handleSelector={handleSelectorSales}
      />
    </div>
  );
}
