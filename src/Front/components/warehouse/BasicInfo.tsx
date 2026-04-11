import type { ModifyFormData, NewItem } from "../../Types/StockTypes";

type Props = {
  formData: NewItem
  modifyFormData: ModifyFormData
}

function BasicInfo({formData, modifyFormData}: Props) {
  return (
    <div className="basic_information_container">
      <div className="title">
        <h2>Basico</h2>
        <p>Informacion Basica</p>
      </div>
      <div className="basic_information">
        <label>
          Nombre del producto
          <input value={formData.name} onChange={(e) => modifyFormData('name' ,e.target.value)} type="text" />
        </label>
        <label>
          Descripción
          <input value={formData.description} onChange={(e) => modifyFormData('description' ,e.target.value)} type="text" />
        </label>
      </div>
    </div>
  );
}

export default BasicInfo