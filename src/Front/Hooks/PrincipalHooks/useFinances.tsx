import { useEffect, useState } from "react";
import type { InitialStateSalesResume } from "../../Types/FinancesResumeTypes";
import { getFinanceResume, getLastSales } from "../../services/homeHTTP";

export function UseFinances() {
  const [finances, setFinances] = useState<InitialStateSalesResume>({
    finances: [
      {
        title: "Total Ventas",
        type: "sales",
        value: 0,
      },
      {
        title: "Numerdo de Ordenes",
        type: "orders",
        value: 0,
      },
      {
        title: "Ganancias Totales",
        type: "income",
        value: 0,
      },
      {
        title: "Inversion Total",
        type: "invesment",
        value: 0,
      },
    ],
    lastOrdes: [],
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [financesData, lastSaleData] = await Promise.all([
          await getFinanceResume(),
          await getLastSales(),
        ]);
        setFinances({
          finances: financesData,
          lastOrdes: lastSaleData,
        });
      } catch (error) {
        throw new Error("It was not possible to save the data");
      }
    };
    load();
  }, []);

  return { finances };
}
