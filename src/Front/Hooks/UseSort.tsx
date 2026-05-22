import { useMemo, useState } from "react";
import { sortItemsByParam } from "../Utils/SortFunction";

export function useSort<T>(list:T[]) {
  const [sortValue, setSortValue] = useState<keyof T| null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedItems = useMemo(() => {
    if (!list) return;

    const items = sortValue
      ? sortItemsByParam(list, sortValue)
      : [...list];

    return sortOrder === "asc" ? items : [...items].reverse();
  }, [list, sortValue, sortOrder]);

  const handleSorted = (val: keyof T) => {
    if (sortValue === val) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortValue(val);
      setSortOrder("asc");
    }
  };

  return { sortedItems, handleSorted};
}
