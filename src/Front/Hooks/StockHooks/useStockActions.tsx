import { useNavigate } from "react-router-dom";
import useWarehouse from "../UseWarehouse";
import { useFetchDataByID, useFetchWarehouses } from "./useFetchWarehouses";
import { removeWarehouse } from "../../services/httpConection";

export function useStockActions() {
  const { selectedWarehouseId, selectWarehouse, clear } = useWarehouse();
  const { fetchWarehousesById } = useFetchDataByID();
  const { fetchWarehouses } = useFetchWarehouses();
  const navigate = useNavigate();

  const handleSelector = (value: string) => {
    selectWarehouse(value)
    fetchWarehousesById(value);
  };

  const deleteWarehouse = async () => {
    if (!selectedWarehouseId) return;
    await removeWarehouse(selectedWarehouseId);
    await fetchWarehouses();
    clear()
  };

  const goToNewItem = () => {
    if (!selectedWarehouseId) return;
    navigate(`${selectedWarehouseId}/items`);
  };

  return { handleSelector, goToNewItem, deleteWarehouse };
}
