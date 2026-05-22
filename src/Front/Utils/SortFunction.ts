import type { Items, SortableItems } from "../Types/StockTypes";

export const sortItemsByParam = (items: Items[], param: SortableItems) => {
  return items.sort((a, b) => {
    const valueA = a[param];
    const valueB = b[param];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB);
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return valueA - valueB;
    }
    return 0;
  });
};
