import type { ReactNode } from "react";
import type { Actions } from "./ReducerTypes";
import type { Items, WarehousesMeta } from "./StockTypes";
import type { SaleItems } from "./SalesTypes";

export interface PropProviderType {
  children: ReactNode;
}

export interface WarehouseContextType {
  warehouses: WarehousesMeta[];
  selectedWarehouseId: string | null;
  warehouseItems: Items[];
  selectWarehouseSalesId: string | null;
  itemsSales: SaleItems[];
  currentSale: SaleItems[];
  dispatch: React.Dispatch<Actions>;
}
