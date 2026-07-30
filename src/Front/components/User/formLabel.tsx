import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FormEditUser } from "../../context/RecuderTypes/Authorization";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Props {
  icon: IconDefinition;
  label: string;
  field: keyof Omit<FormEditUser, "userImage">;
  editMode: boolean;
  handleChage: (
    file: keyof Omit<FormEditUser, "userImage">,
    value: string,
  ) => void;
  value: string | null | undefined;
}

export function Label({
  icon,
  label,
  field,
  editMode,
  handleChage,
  value,
}: Props) {
  return (
    <label htmlFor={field}>
      <FontAwesomeIcon className="icon" icon={icon} />
      <div className="label_data">
        <p>{label}</p>
        {editMode ? (
          <input
            type="text"
            id={field}
            onChange={(e) => handleChage(field, e.target.value)}
            value={value ?? ""}
          />
        ) : (
          <h2>{value === null || value === "" ? "Sin definir" : value}</h2>
        )}
      </div>
    </label>
  );
}
