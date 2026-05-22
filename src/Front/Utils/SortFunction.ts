export function sortItemsByParam<T, K extends keyof T>(list: T[], param: K) {
  return [...list].sort((a, b) => {
    const valueA = a[param];
    const valueB = b[param];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB);
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return valueA - valueB;
    }

    if(valueA instanceof Date && valueB instanceof Date){
      return valueA.getTime() - valueB.getTime()
    }
    return 0;
  });
}
