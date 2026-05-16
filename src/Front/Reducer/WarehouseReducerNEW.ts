import type { Items, WarehousesMeta } from "../Types/StockTypes";

export interface WarehouseState {
  warehouses: WarehousesMeta[];
  selectedWarehouseId: string | null;
  warehouseItems: Items[];
}

export const initialState: WarehouseState = {
  warehouses: [],
  selectedWarehouseId: null,
  warehouseItems: [],
};

type Actions = SelectWarehouse | SetWarehouses | SetWarehousesItems;

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

export const warehouseReducer = (state: WarehouseState, action: Actions) => {
  const { type } = action;
  switch (type) {
    case "SET_WAREHOUSES":
      return { ...state, warehouses: action.payload };
    case "SELECT_WAREHOUSE_STOCK":
      return { ...state, selectedWarehouseId: action.payload };
    case "SET_WAREHOUSE_ITEMS":
      return { ...state, warehouseItems: action.payload };
    default:
      return state;
  }
};
