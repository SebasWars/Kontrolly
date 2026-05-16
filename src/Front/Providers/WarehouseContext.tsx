import { createContext, useReducer, type ReactNode } from "react";
import type { Items, WarehousesMeta } from "../Types/StockTypes";
import { initialState, warehouseReducer } from "../Reducer/WarehouseReducerNEW";

export interface PropProviderType {
  children: ReactNode;
}

interface WarehouseContextType {
  warehouses: WarehousesMeta[];
  selectedWarehouseId: string | null;
  warehouseItems: Items[];

  setWarehouses: (warehouses: WarehousesMeta[]) => void;
  selectWarehouse: (id: string) => void
  setWarehouseItems: (items: Items[]) => void
}

const WarehouseContext = createContext<WarehouseContextType | undefined>(
  undefined,
);

export const WarehouseProvider = ({ children }: PropProviderType) => {
  const [state, dispatch] = useReducer(warehouseReducer, initialState);

  const setWarehouses = (warehouses: WarehousesMeta[]) => {
    dispatch({ type: "SET_WAREHOUSES", payload: warehouses });
  };

  const selectWarehouse = (id: string) => {
    dispatch({type: 'SELECT_WAREHOUSE_STOCK', payload: id})
  }

  const setWarehouseItems = (items: Items[]) => {
    dispatch({type: 'SET_WAREHOUSE_ITEMS', payload: items})
  }

  return (
    <WarehouseContext.Provider
      value={{
        warehouses: state.warehouses,
        selectedWarehouseId: state.selectedWarehouseId,
        warehouseItems: state.warehouseItems,

        setWarehouses,
        selectWarehouse,
        setWarehouseItems
      }}
    >
      {children}
    </WarehouseContext.Provider>
  );
};
