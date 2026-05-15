import useWarehouse from "../UseWarehouse";
import { useFetchSalesItems } from "./useFetchSales";

export function useSalesActions() {
  const { dispatch, itemsSales, selectWarehouseSalesId, currentSale } =
    useWarehouse();
  const { getItemsforSale } = useFetchSalesItems();

  const addToCart = (id: string) => {
    const item = itemsSales?.find((item) => item.id === id);
    if (!item) return;
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: {
        id: item.id,
        name: item.name,
        image_url: item.image_url,
        sales_price: item.sales_price,
        quantity: 1,
      },
    });
  };

  const handleSelectorSales = (value: string) => {
    if (currentSale.length > 0 && selectWarehouseSalesId !== value) {
      //TODO: UN POP UP PARA EVITAR EL CAMBIO DE WAREHOUSE Y PERDER LA COMPRA
      alert("Si cambias de almacen, tu compra se eliminara");
      console.log(currentSale);
      dispatch({ type: "CLEAR_CART" });
    }
    dispatch({ type: "SET_WAREHOUSE_SALES", payload: value });
    getItemsforSale(value);
  };

  return { addToCart, handleSelectorSales };
}
