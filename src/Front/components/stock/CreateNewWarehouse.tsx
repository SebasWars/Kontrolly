import React, { useState } from "react";
import type { StocksTypes } from "../../Types/StockTypes";
import { Stocks } from "../../../MOCK/StocksMock";

interface PropsType {
  toggleModal: (state: boolean) => void;
}

function CreateNewWarehouse({ toggleModal }: PropsType) {
  const [newWarehouse, setNewWarehouse] = useState<StocksTypes>({
    warehouse: "",
    id: crypto.randomUUID(),
    items: [],
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWarehouse((prev) => ({ ...prev, warehouse: e.target.value }));
  };

  const saveNewWarehouse = () => {
    Stocks.push(newWarehouse);
    toggleModal(false);
  };

  return (
    <div className="create_new_warehouse_modal">
      <h2>Crea un nuevo Almacen</h2>
      <input onChange={handleInput} type="text" className="new_ware_house" />
      <div className="action_buttons">
        <button className="discard_btn" onClick={() => toggleModal(false)}>
          Descartar
        </button>
        <button onClick={saveNewWarehouse} className="save_btn">
          Guardar
        </button>
      </div>
    </div>
  );
}

export default CreateNewWarehouse;
