import { createContext, useReducer, type ReactNode } from "react";

import { salesReducer, type SaleItems } from "../Reducer/SalesReducer";
import { initalStateSales } from "../Reducer/SalesReducer";

export interface PropProviderType {
  children: ReactNode;
}

interface SalesContextType {
  selectWarehouseSalesId: string | null;
  itemsSales: SaleItems[];
  currentSale: SaleItems[];

  addItemToCart: (item: SaleItems) => void
  addOne: (id: string) => void
  removeOne: (id: string) => void
  clearCart: () => void
}

export const SalesContext = createContext<SalesContextType | undefined>(
  undefined,
);

export function SalesProvider({children }: PropProviderType) {
  const [state, dispatch] = useReducer(salesReducer, initalStateSales);

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
      }}
    >
      {children}
    </SalesContext.Provider>
  );
}
