import { useEffect, useState } from "react";
import { useFetchInvoices } from "../../Hooks/InvoicesHooks/useFetchInvoices";

type Active = "all" | "sold" | "price";

export function InvoicesHeaderOptions() {
  const { getInvoicesType } = useFetchInvoices();
  const [active, setActive] = useState<Active>("all");
  const show = (value: Active) => (active === value ? "active" : "");
  const setFilter = (val: Active) => {
    setActive(val);
  };
  useEffect(() => {
    getInvoicesType(active);
  }, [active]);
  return (
    <div className="filter_invoices_types_container">
      <div className="button_group">
        <button
          onClick={() => setFilter("all")}
          className={`${show("all")} all_btn`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("sold")}
          className={`${show("sold")} sells_btn`}
        >
          Ventas
        </button>
        <button
          onClick={() => setFilter("price")}
          className={`${show("price")} price_btn`}
        >
          Cotizacion
        </button>
      </div>
    </div>
  );
}
