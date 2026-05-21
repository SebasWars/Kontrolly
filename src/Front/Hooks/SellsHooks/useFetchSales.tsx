import { useEffect } from "react";
import { createSell, getItems } from "../../services/salesHTTP";
import type { SaleItems } from "../../Types/SalesTypes";
import useSales from "../UseSales";
import usePopUp from "../UsePopup";

export function useFetchSalesItems() {
  const { selectWarehouseSalesId, setItemsSales, clearCart } = useSales();
  const { showPopup } = usePopUp();

  async function getItemsforSale(id: string) {
    try {
      const data = await getItems(id);
      setItemsSales(data);
    } catch (error) {
      throw new Error("Error loading items");
    }
  }

  async function completeCurrentSale(
    cartItems: SaleItems[],
    warehouseId: string | null,
    type: 'sold' | 'price'
  ) {
    if (!warehouseId || cartItems.length <= 0) return;
    try {
      await createSell(cartItems, warehouseId, type);
      let titleOp = type === 'sold' ? 'Venta realizada' : 'Cotización realizada'
      let messageOp = type === 'sold' ? 'Venta realizada exitosamente!' : 'Cotización realizada exitosamente!'
      showPopup({
        open: true,
        type: "create",
        title: titleOp,
        message: messageOp,
      });
      clearCart();
    } catch (error) {
      throw new Error("Error creating sale");
    }
  }

  useEffect(() => {
    if (!selectWarehouseSalesId) return;
    getItemsforSale(selectWarehouseSalesId);
  }, [selectWarehouseSalesId]);

  return { getItemsforSale, completeCurrentSale };
}
