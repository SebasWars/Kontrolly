import type { Actions, WarehouseState } from "../RecuderTypes/WarehouseReduce";

export const initialState: WarehouseState = {
  warehouses: [],
  selectedWarehouseId: null,
  warehouseItems: [],
};

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
