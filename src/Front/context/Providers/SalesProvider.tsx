import { createContext, useEffect, useReducer, type ReactNode } from "react";

import {
  type SaleItems,
  type SalesContextType,
} from "../RecuderTypes/SalesReduce";
import { initalStateSales, salesReducer } from "../Reducer/SalesReducer";
import { useAuthorization } from "../../Hooks/UseAuthorization";

export interface PropProviderType {
  children: ReactNode;
}

export const SalesContext = createContext<SalesContextType | undefined>(
  undefined,
);

export function SalesProvider({ children }: PropProviderType) {
  const [state, dispatch] = useReducer(salesReducer, initalStateSales);
  const { token } = useAuthorization();

  const addItemToCart = (item: SaleItems) => {
    dispatch({ type: "ADD_ITEM_TO_CART", payload: item });
  };
  const addOne = (id: string) => {
    dispatch({ type: "ADD_ONE", payload: id });
  };
  const removeOne = (id: string) => {
    dispatch({
      type: "REMOVE_ONE",
      payload: id,
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const setWarehouseSales = (id: string) => {
    dispatch({ type: "SET_WAREHOUSE_SALES", payload: id });
  };

  const setItemsSales = (item: SaleItems[]) => {
    dispatch({ type: "SET_ITEMS_SALES", payload: item });
  };

  const clear = () => {
    dispatch({ type: "CLEAR" });
  };

  useEffect(() => {
    if (!token) {
      clear();
    }
  }, [token]);

  return (
    <SalesContext.Provider
      value={{
        selectWarehouseSalesId: state.selectWarehouseSalesId,
        itemsSales: state.itemsSales,
        currentSale: state.currentSale,

        addItemToCart,
        addOne,
        removeOne,
        clearCart,
        setWarehouseSales,
        setItemsSales,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
}
