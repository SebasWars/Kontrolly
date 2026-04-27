import { useState } from "react";

import Selector from "../components/stock/Selector";
import StockDetailsCards from "../components/stock/StockDetailsCard";
import StockHeader from "../components/stock/StockHeader";
import CreateNewWarehouse from "../components/stock/CreateNewWarehouse";
import StockTable from "../components/stock/StockTable";

import "../styles/stock.css";
import {
  _calculateInvesment,
  _calculateProfits,
  _calculateQuantity,
} from "../Utils/StockUtils";
import useWarehouse from "../Hooks/UseWarehouse";

import { useStockActions } from "../Hooks/useStockActions";
import { useFetchWarehouses } from "../Hooks/useFetchWarehouses";

function Stock() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { selectedWarehouseId, warehouseItems } = useWarehouse();
  const { fetchWarehouses } = useFetchWarehouses();
  const { handleSelector, goToNewItem, deleteWarehouse } = useStockActions();
  const toggleModal = (state: boolean) => setIsModalOpen(state);

  return (
    <div className={`stock_container ${isModalOpen ? "active" : ""}`}>
      <StockHeader toggleModal={toggleModal} />
      <div className="warehouse">
        <div className="title">
          <Selector
            warehouse={selectedWarehouseId || ""}
            handleSelector={handleSelector}
          />
          <button onClick={deleteWarehouse}>Eliminar almacen</button>
          <button onClick={goToNewItem}>Añadir nuevo item</button>
        </div>

        <div className="cards">
          <StockDetailsCards
            value="Cantidad de productos"
            quantity={_calculateQuantity(warehouseItems)}
          />
          <StockDetailsCards
            value="Total de inversion"
            quantity={_calculateInvesment(warehouseItems)}
          />
          <StockDetailsCards
            value="Ingresos estimados"
            quantity={_calculateProfits(warehouseItems)}
          />
        </div>
      </div>
      <StockTable currentWarehouse={warehouseItems} />

      {isModalOpen && (
        <CreateNewWarehouse
          toggleModal={toggleModal}
          refreshWarehouse={fetchWarehouses}
        />
      )}
    </div>
  );
}

export default Stock;
