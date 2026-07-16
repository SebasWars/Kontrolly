interface PropTypes {
  type: string;
  total: number;
  lastUpdate: string | undefined;
}

export function InvoiceBox({ type, total, lastUpdate }: PropTypes) {
  const shortDate = lastUpdate?.slice(0,10)
  return (
    <div className="invoice_mini_resume_container">
      <h3>{type}</h3>
      <h2>{`€${total || '0'}`}</h2>
      <p>{`Ultima catualizacion: ${shortDate ? shortDate : 'No hay registro aun'}`}</p>
    </div>
  );
}
