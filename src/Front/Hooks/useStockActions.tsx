import { useNavigate } from "react-router-dom";
import useWarehouse from "./UseWarehouse";
import { useFetchDataByID, useFetchWarehouses } from "./useFetchWarehouses";
import { deleteStock } from "../conection/httpConection";

export function useStockActions() {
  const { selectedWarehouseId, dispatch } = useWarehouse();
  const { fetchWarehousesById } = useFetchDataByID();
  const { fetchWarehouses } = useFetchWarehouses();
  const navigate = useNavigate();

  const handleSelector = (value: string) => {
    dispatch({ type: "SELECT_WAREHOUSE", payload: value });
    fetchWarehousesById(value);
  };

  const deleteWarehouse = async () => {
    if (!selectedWarehouseId) return;
    await deleteStock(selectedWarehouseId);
    await fetchWarehouses();
    dispatch({ type: "SELECT_WAREHOUSE", payload: null });
    dispatch({ type: "SET_WAREHOUSE_ITEMS", payload: null });
  };

  const goToNewItem = () => {
    if (!selectedWarehouseId) return;
    navigate(`${selectedWarehouseId}/items`);
  };

  return { handleSelector, goToNewItem , deleteWarehouse};
}
