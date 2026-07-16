import {
  createNewWarehouse,
  updateWarehouse,
} from "../../../services/httpConection";
import useWarehouse from "../../../Hooks/UseWarehouse";
import type { CreateStockType } from "../../../Types/StockTypes";
import { WarehouseForm } from "./WarehouseForm";
import usePopUp from "../../../Hooks/UsePopup";

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
  const { selectedWarehouseId, warehouses, selectWarehouse } = useWarehouse();
  const { showPopup } = usePopUp();
  const currentWarehouse = warehouses.find((W) => W.id === selectedWarehouseId);
  const isEdit = modalMode === "edit";

  const initialData: CreateStockType =
    isEdit && currentWarehouse
      ? { warehouse: currentWarehouse.warehouse }
      : { warehouse: "" };

  const handleSubmit = async (data: CreateStockType) => {
    if (data.warehouse === "") return;
    if (isEdit && currentWarehouse) {
      await updateWarehouse(currentWarehouse.id, data.warehouse);
      refreshWarehouse();
      showPopup({
        open: true,
        type: "update",
        title: "Almacen actualizado",
        message: "Almace actualizado exitosamente!",
      });
      closeModal(null);
    } else {
      const created = await createNewWarehouse(data);
      selectWarehouse(created.warehouse_created.id);
      refreshWarehouse();
      showPopup({
        open: true,
        type: "create",
        title: "Almacen creado",
        message: "Almace creado exitosamente!",
      });
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
