import Selector from "../stock/Selectors/Selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSalesActions } from "../../Hooks/SellsHooks/useSalesActions";
import useSales from "../../Hooks/UseSales";

export function SalesSearch() {
  const { selectWarehouseSalesId } = useSales();
  const { handleSelectorSales } = useSalesActions();
  return (
    <div className="search_sales_title">
      <div className="search_item">
        {/* TO DO: HACER LA BUSQUEDA POR COINCIDENCIA DE NOMBRE CON EL BACK */}
        <input type="text" />
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
