import { createContext, useReducer } from "react";
import { initalState, warehouseReducer } from "./Reducer/warehouseReducer";
import type { PropProviderType, WarehouseContextType } from "./Types/ProviderTypes";

export const WarehouseContext = createContext<WarehouseContextType | undefined>(undefined);

export function WarehouseProvider({ children }: PropProviderType) {
  const [state, dispatch] = useReducer(warehouseReducer, initalState);
  const selectedWarehouse = state.warehouses.find((w) => w.id === state.selectedWarehouse) || null;

  return (
    <WarehouseContext.Provider
      value={{ warehouses: state.warehouses, selectedWarehouse, dispatch }}
    >
      {children}
    </WarehouseContext.Provider>
  );
}
