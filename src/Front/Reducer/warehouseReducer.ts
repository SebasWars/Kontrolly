import type { Actions, State } from "../Types/ReducerTypes";

export const initalState: State = {
  warehouses: [],
  selectedWarehouseId: null,
  warehouseItems: null,
  stocksForSales: null
};

export const warehouseReducer = (state: State, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    /* WAREHOUSES FATHER ACTIONS */
    case "SET_WAREHOUSES":
      return { ...state, warehouses: payload };
    /* WAREHOUSE CHILDREN ACTIONS */
    case "SELECT_WAREHOUSE_STOCK":
      return { ...state, selectedWarehouseId: payload };
    case "SET_WAREHOUSE_ITEMS":
      return {...state, warehouseItems: payload}
      /* WAREHOUSE FOR SALES */
    case 'SET_WAREHOUSE_SALES':
      return {...state, stocksForSales: payload}
    default:
      return state;
  }
};
