import { useFetchInvoices } from "../../Hooks/InvoicesHooks/useFetchInvoices";

export function InvoicesHeaderOptions() {
  const { getInvoicesType } = useFetchInvoices()
  return (
    <div className="filter_invoices_types_container">
      <div className="button_group">
        <button onClick={() => getInvoicesType('all')} className="all_btn">Todas</button>
        <button onClick={() => getInvoicesType('sold')} className="sells_btn">Vetas</button>
        <button onClick={() => getInvoicesType('price')} className="price_btn">Cotizacion</button>
      </div>

      <button className="generate_report_btn">Generar reporte</button>
    </div>
  );
}
