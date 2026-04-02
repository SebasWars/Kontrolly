import type { StocksTypes } from "../Types/StockTypes";

export const _calculateQuantity = (obj: StocksTypes | null): number => {
  return obj?.items.length || 0;
};

export const _calculateInvesment = (obj: StocksTypes | null): number => {
  return obj?.items.reduce((acc, item) => acc + item.purchase_price, 0) || 0;
};

export const _calculateProfits = (obj: StocksTypes | null): number => {
  return obj?.items.reduce((acc, item) => acc + item.sales_price, 0) || 0;
};
