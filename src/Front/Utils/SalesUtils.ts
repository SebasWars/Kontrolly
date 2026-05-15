import type { SaleItems } from "../Types/SalesTypes";

export const shortName = (name: string) => {
  if (name.length > 17) {
    return `${name.slice(0, 17)}...`;
  }
  return name;
};

export const calculatePrice = (arr: SaleItems[]) => {
  const price = arr.reduce(
    (acc, item) => acc + item.quantity * item.sales_price,
    0,
  );
  return price;
};
export const calculateIVA = (val: number): number => {
  return (val * 21) / 100;
};

export const CalculateTotal = (total: number, iva: number) => {
  return total + iva;
};
