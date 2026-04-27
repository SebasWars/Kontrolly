import { useStockActions } from "../../Hooks/useStockActions";
import useWarehouse from "../../Hooks/UseWarehouse";
import DropDown from "./DropDown";
import Selector from "./Selector";

export function StockSelectorMenus() {
  const { selectedWarehouseId } = useWarehouse();
  const { handleSelector } = useStockActions();
  return (
    <section className="selector_menus">
      <Selector
        warehouse={selectedWarehouseId || ""}
        handleSelector={handleSelector}
      />
      {selectedWarehouseId && (<DropDown />)}
    </section>
  );
}
