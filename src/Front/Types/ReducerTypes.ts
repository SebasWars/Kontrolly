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
  warehouseItems: Items[];
  selectWarehouseSalesId: string | null;
  itemsSales: SaleItems[];
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
  payload: Items[];
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
  payload: SaleItems[];
}

interface AddItemToCart {
  type: "ADD_ITEM_TO_CART";
  payload: currentSale;
}
