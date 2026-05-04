import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useWarehouse from "../Hooks/UseWarehouse";

import "../styles/addNewItem.css";
import { getWarehouseName } from "../Utils/StockUtils";
import { useItemsActions } from "../Hooks/useItemsActions";
import type { Items, ModifyFormData, NewItem } from "../Types/StockTypes";
import BasicInfo from "../components/warehouse/BasicInfo";
import Fees from "../components/warehouse/Fees";
import UploadImage from "../components/warehouse/UploadImage";

function ModifyItem() {
  const { itemID } = useParams();
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

  return (
    <>
      {!selectedWarehouseId || !dataToModify ? (
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
                <button onClick={discardItem} className="discard_btn">
                  Descartar
                </button>
                <button className="save_btn">guardar</button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default ModifyItem;
