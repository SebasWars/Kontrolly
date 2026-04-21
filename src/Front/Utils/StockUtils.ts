import type { Items, WarehousesMeta } from "../Types/StockTypes";

export const _calculateQuantity = (items: Items[] | null): number => {
  return items?.length || 0;
};

export const _calculateInvesment = (items: Items[] | null): number => {
  return items?.reduce((acc, item) => acc + item.purchase_price, 0) || 0;
};

export const _calculateProfits = (items: Items[] | null): number => {
  return items?.reduce((acc, item) => acc + item.sales_price, 0) || 0;
};

export const getWarehouseName = (arr: WarehousesMeta[], id: string) => {
  const currentWarehosue = arr.find((Wname: WarehousesMeta) => Wname.id === id);
  return currentWarehosue?.warehouse;
};
