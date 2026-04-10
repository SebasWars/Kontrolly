import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useWarehouse from "../Hooks/UseWarehouse";
import BasicInfo from "../components/warehouse/BasicInfo";
import Fees from "../components/warehouse/Fees";

import "../styles/addNewItem.css";
import UploadImage from "../components/warehouse/UploadImage";

function CreateNewItem() {
  const { id } = useParams();
  const {selectedWarehouse, dispatch} = useWarehouse();

  useEffect(() => {
    if (!id) return;
    dispatch({type: 'SELECT_WAREHOUSE', payload: id});
  }, [id]);

  return (
    <>
      {!selectedWarehouse ? (
        <p>Cargando...</p>
      ) : (
        <div className="create_new_item_container">
          <h1>Almacen: {selectedWarehouse?.warehouse}</h1>

          <section className="add_item_section">
            <div className="add_item_section_left_side">
              <BasicInfo />
              <Fees />
            </div>

            <div className="add_item_section_rigth_side">
              <UploadImage />
              <div className="action_buttons">
                <button className="discard_btn">Descartar</button>
                <button className="save_btn">guardar</button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default CreateNewItem;
