import { useEffect, useState } from "react";
import Selector from "../components/stock/Selector";
import StockDetailsCards from "../components/stock/StockDetailsCard";
import StockHeader from "../components/stock/StockHeader";

import "../styles/stock.css";
import { Stocks } from "../../MOCK/StocksMock";
import type { StocksTypes } from "../Types/StockTypes";
import {
  _calculateInvesment,
  _calculateProfits,
  _calculateQuantity,
} from "../Utils/StockUtils";
import CreateNewWarehouse from "../components/stock/CreateNewWarehouse";
import StockTable from "../components/stock/StockTable";

function Stock() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [warehouseId, setWarehouseId] = useState<string>("");
  const [currentWarehouse, setCurrentWarehouse] = useState<StocksTypes | null>(
    null,
  );
  const handleSelector = (value: string) => {
    setWarehouseId(value);
  };

  const toggleModal = (state: boolean) => setIsModalOpen(state);

  const handleWarehouse = () => {
    setCurrentWarehouse(Stocks.find((w) => w.id === warehouseId) || null);
  };

  useEffect(() => {
    handleWarehouse();
  }, [warehouseId]);

  return (
    <div className={`stock_container ${isModalOpen ? "active" : ""}`}>
      <StockHeader toggleModal={toggleModal} />
      <div className="warehouse">
        <div className="title">
          <Selector warehouse={warehouseId} handleSelector={handleSelector} />
          <button>Añadir nuevo item</button>
        </div>

        <div className="cards">
          <StockDetailsCards
            value="Cantidad de productos"
            quantity={_calculateQuantity(currentWarehouse)}
          />
          <StockDetailsCards
            value="Total de inversion"
            quantity={_calculateInvesment(currentWarehouse)}
          />
          <StockDetailsCards
            value="Ingresos estimados"
            quantity={_calculateProfits(currentWarehouse)}
          />
        </div>
      </div>
      <StockTable currentWarehouse={currentWarehouse} />

      {isModalOpen && <CreateNewWarehouse toggleModal={toggleModal} />}
    </div>
  );
}

export default Stock;
