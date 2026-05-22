import { useSort } from "../../Hooks/UseSort";
import type { Items } from "../../Types/StockTypes";
import StockItem from "./StockItem";

interface PropsTypes{
  currenWarehouse : Items[]
}

function StockTable({currenWarehouse}: PropsTypes) {
  const { sortedItems, handleSorted } = useSort(currenWarehouse);
  return (
    <div className="table_container">
      <table>
        <thead>
          <tr>
            <th scope="col">Producto</th>
            <th onClick={() => handleSorted("name")} scope="col">
              Nombre
            </th>
            <th onClick={() => handleSorted("id")} scope="col">
              id
            </th>
            <th onClick={() => handleSorted("description")} scope="col">
              Descripcion
            </th>
            <th onClick={() => handleSorted("sales_price")} scope="col">
              Precio venta
            </th>
            <th onClick={() => handleSorted("purchase_price")} scope="col">
              Precio compra
            </th>
            <th onClick={() => handleSorted("quantity")} scope="col">
              Cantidad
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedItems?.map((item) => {
            return <StockItem key={item.id} item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;
