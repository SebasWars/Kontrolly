import { useEffect } from "react";
import { getItems } from "../../services/salesHTTP";
import useWarehouse from "../StockHooks/UseWarehouse";

export function useFetchSalesItems() {
  const { dispatch, selectWarehouseSalesId } = useWarehouse();

  async function getItemsforSale(id: string) {
    try {
      const data = await getItems(id);
      dispatch({ type: "SET_ITEMS_SALES", payload: data });
    } catch (error) {
        throw new Error('Error loading items')
    }
  }

  useEffect(() => {
    if (!selectWarehouseSalesId) return;
    getItemsforSale(selectWarehouseSalesId);
  }, [selectWarehouseSalesId]);

  return { getItemsforSale };
}
