import { useStockActions } from "../../Hooks/useStockActions";
import useWarehouse from "../../Hooks/UseWarehouse";
import DropDown from "./DropDown";
import Selector from "./Selector";

interface PropsTypes {
  openEdit: (state: 'edit') => void;
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
      {selectedWarehouseId && <DropDown openEdit={openEdit}/>}
    </section>
  );
}
