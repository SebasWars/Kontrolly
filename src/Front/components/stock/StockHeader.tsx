interface PropsType {
  openCreate: (state: 'create') => void;
}

function StockHeader({ openCreate }: PropsType) {
  return (
    <div className="stock_header">
      <h1>Inventario</h1>
      <button onClick={() => openCreate('create')}>Añadir Almacen</button>
    </div>
  );
}

export default StockHeader;
