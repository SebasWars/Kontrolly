import {
  createNewWarehouse,
  updateWarehouse,
} from "../../../conection/httpConection";
import useWarehouse from "../../../Hooks/UseWarehouse";
import type { CreateStockType } from "../../../Types/StockTypes";
import { WarehouseForm } from "./WarehouseForm";

interface PropsType {
  modalMode: "create" | "edit" | null;
  closeModal: (sting: null) => void;
  refreshWarehouse: () => void;
}

export function CreateOrEdit({
  modalMode,
  closeModal,
  refreshWarehouse,
}: PropsType) {
  const { dispatch, selectedWarehouseId, warehouses } = useWarehouse();
  const currentWarehouse = warehouses.find((W) => W.id === selectedWarehouseId);
  const isEdit = modalMode === "edit";

  const initialData: CreateStockType =
    isEdit && currentWarehouse
      ? { warehouse: currentWarehouse.warehouse, items: [] }
      : { warehouse: "", items: [] };

  const handleSubmit = async (data: CreateStockType) => {
    if (isEdit && currentWarehouse) {
      await updateWarehouse(currentWarehouse.id, data.warehouse);
      refreshWarehouse();
      closeModal(null);
    } else {
      const created = await createNewWarehouse(data);
      dispatch({
        type: "SELECT_WAREHOUSE",
        payload: created.warehouse_created.id,
      });

      refreshWarehouse();
      closeModal(null);
    }
  };

  return (
    <WarehouseForm
      onSubmit={handleSubmit}
      initialData={initialData}
      onClose={() => closeModal(null)}
      title={isEdit ? "Modificar Almacen" : "Crear Almacen"}
    />
  );
}
