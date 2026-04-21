import { useNavigate } from "react-router-dom";
import useWarehouse from "./UseWarehouse";
import { useFetchDataByID } from "./useFetchWarehouses";

export function useStockActions() {
  const { selectedWarehouseId, dispatch } = useWarehouse();
  const {fetchWarehousesById} = useFetchDataByID()
  const navigate = useNavigate();

  const handleSelector = (value: string) => {
    dispatch({ type: "SELECT_WAREHOUSE", payload: value });
    fetchWarehousesById(value)
  };

  const goToNewItem = () => {
    if (!selectedWarehouseId) return;
    navigate(`${selectedWarehouseId}/anadir-nuevo-item`);
  };

  return { handleSelector, goToNewItem };
}
