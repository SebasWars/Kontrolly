import { useNavigate } from "react-router-dom";
import { createNewItem } from "../../services/httpConection";
import type { NewItem } from "../../Types/StockTypes";
import { validateNewItem } from "../../Utils/validation";
import { useFetchDataByID } from "./useFetchWarehouses";
import useWarehouse from "../UseWarehouse";

export function useItemsActions() {
  const navigate = useNavigate();
  const { fetchWarehousesById } = useFetchDataByID();
  const { selectedWarehouseId } = useWarehouse();

  const createItem = async (id: string, data: NewItem) => {
    const errors = validateNewItem(data);
    if (Object.keys(errors).length > 0) {
      //TODO AÑADIR FEEDBACK PARA EL USUARIO FRONT
      return;
    }

    await createNewItem(id, data);
    if(!selectedWarehouseId) return;
    await fetchWarehousesById(selectedWarehouseId);
    navigate("/inventario");
  };

  const discardItem = () => {
    navigate("/inventario");
  };

  return { createItem, discardItem };
}
