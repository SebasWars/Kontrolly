import { useEffect } from "react";
import { SalesItemsGrid } from "../components/sales/SalesItemsGrid";
import { SalesResume } from "../components/sales/SalesResume";
import { SalesSearch } from "../components/sales/SalesSearch";
import { useFetchWarehouses } from "../Hooks/StockHooks/useFetchWarehouses";
import useWarehouse from "../Hooks/StockHooks/UseWarehouse";

import "../styles/sales.css";
import { useFetchSalesItems } from "../Hooks/SellsHooks/useFetchSales";

function Sells() {
  const { dispatch, selectWarehouseSalesId, itemsSales} = useWarehouse();
  const {getItemsforSale} = useFetchSalesItems()
  const { fetchWarehouses } = useFetchWarehouses();

  const handleSelectorSales = (value: string) => {
    if(itemsSales.length > 0 && selectWarehouseSalesId !== value){
      //TODO: UN POP UP PARA EVITAR EL CAMBIO DE WAREHOUSE Y PERDER LA COMPRA
      alert('Si cambias de almacen, tu compra se eliminara')
      dispatch({ type: "CLEAR_CART" });
    }
    dispatch({ type: "SET_WAREHOUSE_SALES", payload: value });
    getItemsforSale(value)
  };

  const addToCart = (id: string) => {
    const item = itemsSales?.find((item) => item.id === id)
    if(!item) return;
    dispatch({type: 'ADD_ITEM_TO_CART', payload: {
      id: item.id,
      name: item.name,
      image_url: item.image_url,
      sales_price: item.sales_price,
      quantity: 1
    }})
  }
  useEffect(() => {
    fetchWarehouses();
  }, [selectWarehouseSalesId]);

  return (
    <div className="sales_container">
      <section className="sales_left_container">
        <SalesSearch
          handleChange={handleSelectorSales}
          stockForSalesID={selectWarehouseSalesId || ""}
        />
        <SalesItemsGrid itemsSales={itemsSales} addToCart={addToCart}/>
      </section>
      <SalesResume />
    </div>
  );
}

export default Sells;
