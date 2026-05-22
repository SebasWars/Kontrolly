import { useMemo, useState } from "react";
import type { SortableItems } from "../../Types/StockTypes";
import useWarehouse from "../UseWarehouse";
import { sortItemsByParam } from "../../Utils/SortFunction";

export function useStockSort() {
  const [sortValue, setSortValue] = useState<SortableItems | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { warehouseItems } = useWarehouse();

  const sortedItems = useMemo(() => {
    if (!warehouseItems) return;

    const items = sortValue
      ? sortItemsByParam(warehouseItems, sortValue)
      : [...warehouseItems];

    return sortOrder === "asc" ? items : [...items].reverse();
  }, [warehouseItems, sortValue, sortOrder]);

  const handleSorted = (val: SortableItems) => {
    if (sortValue === val) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortValue(val);
      setSortOrder("asc");
    }
  };

  return { sortedItems, handleSorted };
}
