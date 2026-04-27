import type { Items, WarehousesMeta } from "./StockTypes";

export type Actions = SelectWarehouse | SetWarehouses | SetWarehousesItems;

export interface State {
  warehouses: WarehousesMeta[];
  selectedWarehouseId: string | null;
  warehouseItems: Items[] | null;
}

interface SelectWarehouse {
  type: "SELECT_WAREHOUSE";
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
