import type { ReactNode } from "react";
import type { Actions } from "./ReducerTypes";
import type { StocksTypes } from "./StockTypes";

export interface PropProviderType {
  children: ReactNode;
}

export interface WarehouseContextType {
  warehouses: StocksTypes[];
  selectedWarehouse: StocksTypes | null;
  dispatch: React.Dispatch<Actions>;
}