import type { Actions, State } from "../Types/ReducerTypes";

export const initalState: State = {
  warehouses: [],
  selectedWarehouse: null,
};

export const warehouseReducer = (state: State, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    /* WAREHOUSES FATHER ACTIONS */
    case "SET_WAREHOUSES":
      return { ...state, warehouses: payload };
    /* WAREHOUSE CHILDREN ACTIONS */
    case "SELECT_WAREHOUSE":
      return { ...state, selectedWarehouse: payload };
    default:
      return state;
  }
};
