export function InvoicesHeaderOptions() {
  return (
    <div className="filter_invoices_types_container">
      <div className="button_group">
        <button className="all_btn">Todas</button>
        <button className="sells_btn">Vetas</button>
        <button className="price_btn">Cotizacion</button>
      </div>

      <button className="generate_report_btn">Generar reporte</button>
    </div>
  );
}
