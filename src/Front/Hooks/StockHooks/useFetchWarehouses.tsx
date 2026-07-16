import { useEffect } from "react";
import { getWarehousebyID, getWarehouses } from "../../services/httpConection";
import useWarehouse from "../UseWarehouse";

export function useFetchWarehouses() {
  const {setWarehouses } = useWarehouse();

  async function fetchWarehouses() {
    try {
      const data = await getWarehouses();
      setWarehouses(data.warehouses)
    } catch (error) {
      console.error("Error loading warehouses:", error);
    }
  }

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return { fetchWarehouses };
}

export function useFetchDataByID() {
  const { selectedWarehouseId, setWarehouseItems} = useWarehouse();

  async function fetchWarehousesById(id: string) {
    const data = await getWarehousebyID(id);
    setWarehouseItems(data.warehouse )
  }
  useEffect(() => {
    if(!selectedWarehouseId) return;
/* TO CHECK */
  },[selectedWarehouseId])

  return {fetchWarehousesById}
}
