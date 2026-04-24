import { useEffect } from "react";
import { getWarehousebyID, getWarehouses } from "../conection/httpConection";
import useWarehouse from "./UseWarehouse";

export function useFetchWarehouses() {
  const { dispatch } = useWarehouse();

  async function fetchWarehouses() {
    try {
      const data = await getWarehouses();
      dispatch({
        type: "SET_WAREHOUSES",
        payload: data.warehouses,
      });
    } catch (error) {
      console.error("Error cargando warehouses:", error);
    }
  }

  useEffect(() => {
    fetchWarehouses();
  }, [dispatch]);

  return { fetchWarehouses };
}

export function useFetchDataByID() {
  const { selectedWarehouseId, dispatch} = useWarehouse();

  async function fetchWarehousesById(id: string) {
    const data = await getWarehousebyID(id);
    dispatch({ type: "SET_WAREHOUSE_ITEMS", payload: data.warehouse });
  }
  useEffect(() => {
    if(!selectedWarehouseId) return;

    fetchWarehousesById(selectedWarehouseId)
  },[selectedWarehouseId])

  return {fetchWarehousesById}
}
