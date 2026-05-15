import { useEffect } from "react";
import { createSell, getItems } from "../../services/salesHTTP";
import useWarehouse from "../UseWarehouse";
import type { SaleItems } from "../../Types/SalesTypes";

export function useFetchSalesItems() {
  const { dispatch, selectWarehouseSalesId } = useWarehouse();

  async function getItemsforSale(id: string) {
    try {
      const data = await getItems(id);
      dispatch({ type: "SET_ITEMS_SALES", payload: data });
    } catch (error) {
      throw new Error("Error loading items");
    }
  }

  async function completeCurrentSale(
    cartItems: SaleItems[],
    warehouseId: string | null,
  ) {
    if (!warehouseId || cartItems.length <= 0) return
    try {
      await createSell(cartItems, warehouseId);
      dispatch({type: "CLEAR_CART"})
    } catch (error) {
      throw new Error("Error creating sale");
    }
  }

  useEffect(() => {
    if (!selectWarehouseSalesId) return;
    getItemsforSale(selectWarehouseSalesId);
  }, [selectWarehouseSalesId, dispatch]);

  return { getItemsforSale, completeCurrentSale };
}
