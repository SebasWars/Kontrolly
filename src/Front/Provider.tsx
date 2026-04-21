import { createContext, useReducer } from "react";
import { initalState, warehouseReducer } from "./Reducer/warehouseReducer";
import type { PropProviderType, WarehouseContextType } from "./Types/ProviderTypes";

export const WarehouseContext = createContext<WarehouseContextType | undefined>(undefined);

export function WarehouseProvider({ children }: PropProviderType) {
  const [state, dispatch] = useReducer(warehouseReducer, initalState);

  return (
    <WarehouseContext.Provider
      value={{warehouses: state.warehouses, selectedWarehouseId: state.selectedWarehouseId, warehouseItems: state.warehouseItems, dispatch}}
    >
      {children}
    </WarehouseContext.Provider>
  );
}
