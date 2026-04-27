import React, { useState } from "react";
import type { CreateStockType } from "../../Types/StockTypes";
import { createNewWarehouse } from "../../conection/httpConection";
import useWarehouse from "../../Hooks/UseWarehouse";

interface PropsType {
  toggleModal: (state: boolean) => void;
  refreshWarehouse: () => void;
}

function CreateNewWarehouse({ toggleModal, refreshWarehouse }: PropsType) {
  const { dispatch } = useWarehouse();
  const [newWarehouse, setNewWarehouse] = useState<CreateStockType>({
    warehouse: "",
    items: [],
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWarehouse((prev) => ({ ...prev, warehouse: e.target.value }));
  };

  const saveNewWarehouse = async () => {
    const created = await createNewWarehouse(newWarehouse);
    refreshWarehouse();
    toggleModal(false);
    dispatch({
      type: "SELECT_WAREHOUSE",
      payload: created.warehouse_created.id,
    });
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
