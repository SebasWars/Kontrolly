import type { ReactNode } from "react";
import type { Actions } from "./ReducerTypes";
import type { Items, WarehousesMeta } from "./StockTypes";

export interface PropProviderType {
  children: ReactNode;
}

export interface WarehouseContextType {
  warehouses: WarehousesMeta[];
  selectedWarehouseId: string | null;
  warehouseItems: Items[] | null;
  dispatch: React.Dispatch<Actions>;
}