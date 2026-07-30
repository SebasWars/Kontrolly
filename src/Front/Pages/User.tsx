import "../styles/user.css";
import { UserForm } from "../components/User/UserForm";
import { PasswordForm } from "../components/User/PasswordForm";
import { HeaderUser } from "../components/User/HeaderUser";
import type { User } from "../context/RecuderTypes/Authorization";
import { UseEditForm } from "../Hooks/UserHooks/useEditForm";

export function User() {
  const { editMode, formData, handleChage, handleEdit, handleImageChange, updateUser } = UseEditForm();

  return (
    <div className="user_main_container">
      <div className="user_main">
        <HeaderUser
          formData={formData}
          handleChage={handleChage}
          editMode={editMode}
          handleEdit={handleEdit}
          handleImageChange={handleImageChange}
          updateUser={updateUser}
        />
        <UserForm
          formData={formData}
          handleChage={handleChage}
          editMode={editMode}
        />
        <PasswordForm />
      </div>
    </div>
  );
}
