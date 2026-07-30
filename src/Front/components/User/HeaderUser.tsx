import type { FormEditUser, User } from "../../context/RecuderTypes/Authorization";
import { useAuthorization } from "../../Hooks/UseAuthorization";
import { UserImage } from "./Image";

interface PropType {
  formData: FormEditUser | null;
  handleChage: (
    file: keyof Omit<FormEditUser, "userImage">,
    value: string,
  ) => void;
  editMode: boolean;
  handleEdit: () => void;
  handleImageChange: (file: File) => void;
  updateUser: (formData: FormEditUser, id: string) => Promise<User>;
}

export function HeaderUser({
  formData,
  handleChage,
  editMode,
  handleEdit,
  handleImageChange,
  updateUser,
}: PropType) {
  const { user, updateUserFunc } = useAuthorization();

  const edit = async () => {
    if (!user || !formData) return;

    if (editMode) {
      try {
        const userUpdated = await updateUser(formData, user.id);
        handleEdit();
        updateUserFunc(userUpdated);
      } catch (error) {
        console.error("No se pudo guardar:", error);
        return;
      }
    } else {
      handleEdit();
    }
  };

  return (
    <div className="header">
      <div className="top"></div>
      <UserImage
        editMode={editMode}
        imageUrl={user?.userImage}
        newImageFile={formData?.userImage}
        handleImageChange={handleImageChange}
      />

      <div className="bottom">
        {editMode ? (
          <input
            onChange={(e) => handleChage("companyName", e.target.value)}
            type="text"
            value={
              formData?.companyName === null
                ? "Sin definir"
                : formData?.companyName
            }
          />
        ) : (
          <h1>
            {formData?.companyName === null || formData?.companyName == ""
              ? "Sin definir"
              : formData?.companyName}
          </h1>
        )}
        <button onClick={edit}>{editMode ? "Guardar" : "Editar perfil"}</button>
      </div>
    </div>
  );
}
