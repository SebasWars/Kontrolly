import useSales from "../UseSales";
import { useFetchSalesItems } from "./useFetchSales";

export function useSalesActions() {
  const { itemsSales, selectWarehouseSalesId , setWarehouseSales, currentSale, addItemToCart, clearCart} = useSales();
  const { getItemsforSale } = useFetchSalesItems();

  const addToCart = (id: string) => {
    const item = itemsSales?.find((item) => item.id === id);
    if (!item) return;
    addItemToCart({
        id: item.id,
        name: item.name,
        image_url: item.image_url,
        sales_price: item.sales_price,
        quantity: 1,
      })
  };

  const handleSelectorSales = (value: string) => {
    if (currentSale.length > 0 && selectWarehouseSalesId !== value) {
      //TODO: UN POP UP PARA EVITAR EL CAMBIO DE WAREHOUSE Y PERDER LA COMPRA
      alert("Si cambias de almacen, tu compra se eliminara");

      clearCart()
    }
    setWarehouseSales(value)
    getItemsforSale(value);
  };

  return { addToCart, handleSelectorSales };
}
