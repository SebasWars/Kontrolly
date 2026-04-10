import { useState } from "react";
import { useNavigate } from "react-router-dom";


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

function Stock() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { selectedWarehouse, dispatch } = useWarehouse();
  const navigate = useNavigate();

  const toggleModal = (state: boolean) => setIsModalOpen(state);

  const handleSelector = (value: string) => {
    dispatch({type: 'SELECT_WAREHOUSE', payload: value});
  };

  const directNewItem = () => {
    if (!selectedWarehouse) return;
    navigate(`${selectedWarehouse?.id}/anadir-nuevo-item`);
  };

  return (
    <div className={`stock_container ${isModalOpen ? "active" : ""}`}>
      <StockHeader toggleModal={toggleModal} />
      <div className="warehouse">
        <div className="title">
          <Selector
            warehouse={selectedWarehouse?.id || ""}
            handleSelector={handleSelector}
          />
          <button onClick={directNewItem}>Añadir nuevo item</button>
        </div>

        <div className="cards">
          <StockDetailsCards
            value="Cantidad de productos"
            quantity={_calculateQuantity(selectedWarehouse)}
          />
          <StockDetailsCards
            value="Total de inversion"
            quantity={_calculateInvesment(selectedWarehouse)}
          />
          <StockDetailsCards
            value="Ingresos estimados"
            quantity={_calculateProfits(selectedWarehouse)}
          />
        </div>
      </div>
      <StockTable currentWarehouse={selectedWarehouse} />

      {isModalOpen && <CreateNewWarehouse toggleModal={toggleModal} />}
    </div>
  );
}

export default Stock;
