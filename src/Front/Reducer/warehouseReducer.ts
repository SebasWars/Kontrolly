import type { Actions, State } from "../Types/ReducerTypes";

export const initalState: State = {
  warehouses: [],
  selectedWarehouseId: null,
  warehouseItems: null,
};

export const warehouseReducer = (state: State, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    /* WAREHOUSES FATHER ACTIONS */
    case "SET_WAREHOUSES":
      return { ...state, warehouses: payload };
    /* WAREHOUSE CHILDREN ACTIONS */
    case "SELECT_WAREHOUSE":
      return { ...state, selectedWarehouseId: payload };
    case "SET_WAREHOUSE_ITEMS":
      return {...state, warehouseItems: payload}
    default:
      return state;
  }
};
