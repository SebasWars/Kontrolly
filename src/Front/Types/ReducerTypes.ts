import type { currentSale, SaleItems } from "./SalesTypes";
import type { Items, WarehousesMeta } from "./StockTypes";

export type Actions =
  | SelectWarehouse
  | SetWarehouses
  | SetWarehousesItems
  | SetWarehouseForSales
  | SetSalesItems
  | AddItemToCart;

export interface State {
  warehouses: WarehousesMeta[];
  selectedWarehouseId: string | null;
  warehouseItems: Items[] | null;
  selectWarehouseSalesId: string | null;
  itemsSales: SaleItems[] | null;
  currentSale: currentSale[] ;
}

interface SelectWarehouse {
  type: "SELECT_WAREHOUSE_STOCK";
  payload: string | null;
}

interface SetWarehouses {
  type: "SET_WAREHOUSES";
  payload: WarehousesMeta[];
}

interface SetWarehousesItems {
  type: "SET_WAREHOUSE_ITEMS";
  payload: Items[] | null;
}

interface SetWarehouseForSales {
  type: "SET_WAREHOUSE_SALES";
  payload: string | null;
}

/* DE MOMENTO, PUEDE QUE EN UN FUTURO LO MEJOR SEA SOLO OBTENER 
  CIERTA INFORMACION DEL ITEM, NO TODO.
*/

interface SetSalesItems {
  type: "SET_ITEMS_SALES";
  payload: SaleItems[] | null;
}

interface AddItemToCart {
  type: "ADD_ITEM_TO_CART";
  payload: currentSale;
}
