import { createContext, useReducer, type ReactNode } from "react";
import type { Items, WarehousesMeta } from "../../Types/StockTypes";
import { initialState, warehouseReducer } from "../Reducer/WarehouseReducer";
import type { WarehouseContextType } from "../RecuderTypes/WarehouseReduce";

interface PropProviderType {
  children: ReactNode;
}

export const WarehouseContext = createContext<WarehouseContextType | undefined>(
  undefined,
);

export const WarehouseProvider = ({ children }: PropProviderType) => {
  const [state, dispatch] = useReducer(warehouseReducer, initialState);

  const setWarehouses = (warehouses: WarehousesMeta[]) => {
    dispatch({ type: "SET_WAREHOUSES", payload: warehouses });
  };

  const selectWarehouse = (id: string| null) => {
    dispatch({type: 'SELECT_WAREHOUSE_STOCK', payload: id})
  }

  const setWarehouseItems = (items: Items[]) => {
    dispatch({type: 'SET_WAREHOUSE_ITEMS', payload: items})
  }

  const clear = () => {
    selectWarehouse(null)
    setWarehouseItems([])
  }

  return (
    <WarehouseContext.Provider
      value={{
        warehouses: state.warehouses,
        selectedWarehouseId: state.selectedWarehouseId,
        warehouseItems: state.warehouseItems,

        setWarehouses,
        selectWarehouse,
        setWarehouseItems,
        clear
      }}
    >
      {children}
    </WarehouseContext.Provider>
  );
};
