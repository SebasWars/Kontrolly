import React, { useState } from "react";
import type { CreateStockType } from "../../../Types/StockTypes";

interface PropsType {
  onSubmit: (data: CreateStockType) => void;
  initialData: CreateStockType;
  onClose: () => void;
  title: string;
}

export function WarehouseForm({
  onSubmit,
  initialData,
  onClose,
  title,
}: PropsType) {
  const [formData, setFormData] = useState(initialData);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, warehouse: value }));
  };

  return (
    <>
      <div className="create_new_warehouse_modal">
        <h2>{title}</h2>
        <input onChange={handleInput} type="text" className="new_ware_house" />
        <div className="action_buttons">
          <button className="discard_btn" onClick={onClose}>
            Descartar
          </button>
          <button onClick={() => onSubmit(formData)} className="save_btn">
            Guardar
          </button>
        </div>
      </div>
    </>
  );
}
