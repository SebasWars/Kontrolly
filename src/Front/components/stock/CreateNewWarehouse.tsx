import React, { useState } from "react";
import type { CreateStockType } from "../../Types/StockTypes";
import { createNewWarehouse } from "../../conection/httpConection";
import useWarehouse from "../../Hooks/UseWarehouse";

interface PropsType {
  modalMode: "create" | "edit" | null
  openEdit: (sting: 'create') => void
  closeModal: (sting: null) => void
  refreshWarehouse: () => void;
}

function CreateNewWarehouse({modalMode, openEdit,closeModal, refreshWarehouse }: PropsType) {
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
    openEdit('create');
    dispatch({
      type: "SELECT_WAREHOUSE",
      payload: created.warehouse_created.id,
    });
  };

  return (
    <div className="create_new_warehouse_modal">
      <h2>{modalMode === 'create' ? 'Crea un nuevo' : 'Modificar'} Almacen</h2>
      <input onChange={handleInput} type="text" className="new_ware_house" />
      <div className="action_buttons">
        <button className="discard_btn" onClick={() => closeModal(null)}>
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
