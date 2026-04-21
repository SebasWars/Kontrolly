import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useWarehouse from "../Hooks/UseWarehouse";
import BasicInfo from "../components/warehouse/BasicInfo";
import Fees from "../components/warehouse/Fees";
import UploadImage from "../components/warehouse/UploadImage";

import "../styles/addNewItem.css";
import type { ModifyFormData, NewItem } from "../Types/StockTypes";
import { getWarehouseName } from "../Utils/StockUtils";

function CreateNewItem() {
  const { id } = useParams();
  const { warehouses, selectedWarehouseId, dispatch } = useWarehouse();
  const [formData, setFormData] = useState<NewItem>({
    name: "",
    description: "",
    image: null,
    purchase_price: "",
    quantity: "",
    sales_price: "",
  });

  const modifyFormData: ModifyFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!id) return;
    dispatch({ type: "SELECT_WAREHOUSE", payload: id });
  }, [id]);

  return (
    <>
      {!selectedWarehouseId ? (
        <p>Cargando...</p>
      ) : (
        <div className="create_new_item_container">
          <h1>Almacen: {getWarehouseName(warehouses, selectedWarehouseId)}</h1>

          <section className="add_item_section">
            <div className="add_item_section_left_side">
              <BasicInfo formData={formData} modifyFormData={modifyFormData} />
              <Fees formData={formData} modifyFormData={modifyFormData} />
            </div>

            <div className="add_item_section_rigth_side">
              <UploadImage modifyFormData={modifyFormData} />
              <div className="action_buttons">
                <button className="discard_btn">Descartar</button>
                <button
                  className="save_btn"
                  onClick={() => console.log(formData)}
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

export default CreateNewItem;
