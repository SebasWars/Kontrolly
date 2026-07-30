import {
  faAt,
  faLocationDot,
  faMapLocationDot,
  faMountainCity,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import type { FormEditUser } from "../../context/RecuderTypes/Authorization";
import { Label } from "./formLabel";

interface PropType {
  formData: FormEditUser | null;
  handleChage: (
    file: keyof Omit<FormEditUser, "userImage">,
    value: string,
  ) => void;
  editMode: boolean;
}

export function UserForm({ formData, handleChage, editMode }: PropType) {
  return (
    <div className="user_information">
      <form action="">
        <div className="left">
          <Label
            icon={faUser}
            label="Persona encargada"
            field="name"
            editMode={editMode}
            handleChage={handleChage}
            value={formData?.name}
          />
          <Label
            icon={faAt}
            label="Correo electronico"
            field="email"
            editMode={editMode}
            handleChage={handleChage}
            value={formData?.email}
          />

          <Label
            icon={faPhone}
            label="Telefono movil"
            field="phoneNumber"
            editMode={editMode}
            handleChage={handleChage}
            value={formData?.phoneNumber}
          />
        </div>

        <div className="rigth">
          <Label
            icon={faLocationDot}
            label="Dirrección"
            field="address"
            editMode={editMode}
            handleChage={handleChage}
            value={formData?.address}
          />

          <Label
            icon={faMapLocationDot}
            label="Codigo postal"
            field="postalCode"
            editMode={editMode}
            handleChage={handleChage}
            value={formData?.postalCode}
          />

          <Label
            icon={faMountainCity}
            label="Ciudad"
            field="city"
            editMode={editMode}
            handleChage={handleChage}
            value={formData?.city}
          />
        </div>
      </form>
    </div>
  );
}
