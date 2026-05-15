import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useWarehouse from "../Hooks/UseWarehouse";

import "../styles/addNewItem.css";
import { getWarehouseName } from "../Utils/StockUtils";
import { useItemsActions } from "../Hooks/StockHooks/useItemsActions";
import type { Items, ModifyFormData, NewItem } from "../Types/StockTypes";
import BasicInfo from "../components/warehouse/BasicInfo";
import Fees from "../components/warehouse/Fees";
import UploadImage from "../components/warehouse/UploadImage";
import { removeItem, updateItem } from "../services/httpConection";
import { validateUpdateItem } from "../Utils/validation";

function ModifyItem() {
  const { itemID } = useParams<{itemID: string}>();
  const navigate = useNavigate();
  const { warehouses, selectedWarehouseId, warehouseItems } = useWarehouse();
  const { discardItem } = useItemsActions();
  const [dataToModify, setDataToModify] = useState<NewItem | null>(null);
  const currentItem = warehouseItems?.find((W) => W.id === itemID);

  const trasnformDataFrom = (items: Items): NewItem => {
    return {
      name: items.name,
      description: items.description,
      quantity: String(items.quantity),
      sales_price: String(items.sales_price),
      purchase_price: String(items.purchase_price),
      image: null,
    };
  };

  useEffect(() => {
    if (!currentItem) return;
    setDataToModify(trasnformDataFrom(currentItem));
  }, [currentItem]);

  const modifySetter: ModifyFormData = (key, value) => {
    setDataToModify((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const modifyItem = async (
    warehouseID: string,
    itemID: string ,
    formData: NewItem,
  ) => {
    if (!itemID) return;
    const errors = validateUpdateItem(formData);
    if (Object.keys(errors).length > 0) {
      //TODO AÑADIR FEEDBACK PARA EL USUARIO FRONT
      return;
    }
    await updateItem(warehouseID, itemID, formData);
    navigate("/inventario");
  };

  const deleteItem = async (warehouseId: string, itemID: string) => {
    if(!itemID) return
    await removeItem(warehouseId, itemID);
    navigate('/inventario')
  };

  return (
    <>
      {!selectedWarehouseId || !itemID || !dataToModify ? (
        <p>Cargando...</p>
      ) : (
        <div className="create_new_item_container">
          <h1>Almacen: {getWarehouseName(warehouses, selectedWarehouseId)}</h1>

          <section className="add_item_section">
            <div className="add_item_section_left_side">
              <BasicInfo
                formData={dataToModify}
                modifyFormData={modifySetter}
              />
              <Fees formData={dataToModify} modifyFormData={modifySetter} />
            </div>

            <div className="add_item_section_rigth_side">
              <UploadImage
                modifyFormData={modifySetter}
                initialImage={currentItem?.image_url ?? null}
              />
              <div className="action_buttons">
                <button onClick={() => deleteItem(selectedWarehouseId, itemID)} className="remove_btn">
                  Eliminar
                </button>
                <button onClick={discardItem} className="discard_btn">
                  Descartar
                </button>
                <button
                  onClick={() =>
                    modifyItem(selectedWarehouseId, itemID, dataToModify)
                  }
                  className="save_btn"
                >
                  guardar
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default ModifyItem;
