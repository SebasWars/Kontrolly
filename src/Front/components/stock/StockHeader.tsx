interface PropsType {
  toggleModal: (state: boolean) => void;
}

function StockHeader({ toggleModal }: PropsType) {
  return (
    <div className="stock_header">
      <h1>Inventario</h1>
      <button onClick={() => toggleModal(true)}>Añadir Almacen</button>
    </div>
  );
}

export default StockHeader;
