import { Stocks } from "../../MOCK/StocksMock";
import type { Actions, State } from "../Types/ReducerTypes";

export const initalState: State = {
  warehouses: Stocks,
  selectedWarehouse: null,
};

export const warehouseReducer = (state: State, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    case "SELECT_WAREHOUSE":
      return { ...state, selectedWarehouse: payload };
    default:
      return state;
  }
};
