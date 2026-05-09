import type { Items, WarehousesMeta } from "./StockTypes";

export type Actions =
  | SelectWarehouse
  | SetWarehouses
  | SetWarehousesItems
  | SetWarehouseForSales;

export interface State {
  warehouses: WarehousesMeta[];
  selectedWarehouseId: string | null;
  warehouseItems: Items[] | null;
  stocksForSales:string | null;
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
