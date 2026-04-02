import type { StocksTypes } from "../../Types/StockTypes";
import StockItem from "./StockItem";

interface PropsType {
  currentWarehouse: StocksTypes | null;
}

function StockTable({ currentWarehouse }: PropsType) {
  return (
    <div className="table_container">
      <table>
        <thead>
          <tr>
            <th scope="col">Producto</th>
            <th scope="col">Nombre</th>
            <th scope="col">id</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio venta</th>
            <th scope="col">Precio compra</th>
            <th scope="col">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {currentWarehouse?.items.map((item) => {
            return <StockItem key={item.id} item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;
