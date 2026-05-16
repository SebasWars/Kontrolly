import type { Items, WarehousesMeta } from "../../Types/StockTypes";

export interface WarehouseContextType {
  warehouses: WarehousesMeta[];
  selectedWarehouseId: string | null;
  warehouseItems: Items[];

  setWarehouses: (warehouses: WarehousesMeta[]) => void;
  selectWarehouse: (id: string | null) => void
  setWarehouseItems: (items: Items[]) => void
  clear: () => void
}

export interface WarehouseState {
  warehouses: WarehousesMeta[];
  selectedWarehouseId: string | null;
  warehouseItems: Items[];
}


export type Actions = SelectWarehouse | SetWarehouses | SetWarehousesItems;

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