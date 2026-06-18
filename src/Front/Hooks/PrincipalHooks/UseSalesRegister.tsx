import { useEffect, useState } from "react";
import type { SalesRegister, Type } from "../../Types/FinancesResumeTypes";
import { getSalesResume } from "../../services/homeHTTP";

export function UseSalesRegister() {
  const [salesFilterType, setSalesFilterType] = useState<Type>("month");
  const [salesRegister, setSalesRegister] = useState<SalesRegister>([]);

  const salesFilterHandler = (value: Type) => {
    setSalesFilterType(value);
  };

  useEffect(() => {
    const loadSales = async () => {
      try {
        const resume = await getSalesResume(salesFilterType);
        setSalesRegister(resume);
      } catch (error) {
        throw new Error("Error saving sales data");
      }
    };
    loadSales();
  }, [salesFilterType]);

  return { salesRegister, salesFilterHandler, salesFilterType };
}
