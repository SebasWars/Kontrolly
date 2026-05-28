import { useStockActions } from "../../Hooks/StockHooks/useStockActions";
import useWarehouse from "../../Hooks/UseWarehouse";
import Selector from "../UI/WarehouseSelector";
import DropDown from "./Selectors/DropDown";


interface PropsTypes {
  openEdit: (state: "edit") => void;
}

export function StockSelectorMenus({ openEdit }: PropsTypes) {
  const { selectedWarehouseId } = useWarehouse();
  const { handleSelector } = useStockActions();
  return (
    <section className="selector_menus">
      <Selector
        warehouse={selectedWarehouseId || ""}
        handleSelector={handleSelector}
      />
      {selectedWarehouseId && <DropDown openEdit={openEdit} />}
    </section>
  );
}
