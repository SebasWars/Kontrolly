import { useEffect } from "react";
import { getWarehouses } from "../conection/httpConection";
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

  return {fetchWarehouses}
}
