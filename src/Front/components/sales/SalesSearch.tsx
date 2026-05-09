import useWarehouse from "../../Hooks/StockHooks/UseWarehouse";
import Selector from "../stock/Selectors/Selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useFetchWarehouses } from "../../Hooks/StockHooks/useFetchWarehouses";

export function SalesSearch() {
  const { dispatch, stocksForSales } = useWarehouse();
  /* MOVER ESTO AL COMPONENTE PADRE EN CUANTO LO NECESTE,  */
  const { fetchWarehouses } = useFetchWarehouses();

  const handleSelectorSales = (value: string) => {
    dispatch({ type: "SET_WAREHOUSE_SALES", payload: value });
    /* FETCH PARA LA LISTA DE LOS ITEMS */
  };

  useEffect(() => {
    fetchWarehouses()
  },[])

  return (
    <div className="search_sales_title">
      <div className="search_item">
        <input type="text" />
        <button className="search_item_btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {/* MODIFICAR SELECT, ESTA VINCUALDO CON EL MEÉTODO PARA STOCK */}
      <Selector
        warehouse={ stocksForSales|| ""}
        handleSelector={handleSelectorSales}
      />
    </div>
  );
}
