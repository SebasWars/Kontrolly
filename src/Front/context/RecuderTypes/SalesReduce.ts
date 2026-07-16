export interface SalesContextType {
  selectWarehouseSalesId: string | null;
  itemsSales: SaleItems[];
  currentSale: SaleItems[];

  addItemToCart: (item: SaleItems) => void;
  addOne: (id: string) => void;
  removeOne: (id: string) => void;
  clearCart: () => void;
  setWarehouseSales: (id: string) => void;
  setItemsSales: (item: SaleItems[]) => void;
}

export interface SalesState {
  selectWarehouseSalesId: string | null;
  itemsSales: SaleItems[];
  currentSale: SaleItems[];
}

export interface SaleItems {
  id: string;
  name: string;
  image_url: string | null;
  quantity: number;
  sales_price: number;
}

export type Actions =
  | SetWarehouseForSales
  | SetSalesItems
  | AddItemToCart
  | AddOne
  | RemoveOne
  | ClearCart
  | CLEAR;

interface SetWarehouseForSales {
  type: "SET_WAREHOUSE_SALES";
  payload: string | null;
}

interface SetSalesItems {
  type: "SET_ITEMS_SALES";
  payload: SaleItems[];
}

interface AddItemToCart {
  type: "ADD_ITEM_TO_CART";
  payload: SaleItems;
}

interface AddOne {
  type: "ADD_ONE";
  payload: string;
}

interface RemoveOne {
  type: "REMOVE_ONE";
  payload: string;
}

interface ClearCart {
  type: "CLEAR_CART";
}

interface CLEAR {
  type: "CLEAR";
}
