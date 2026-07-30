import { faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { changePassword } from "../../services/userHTTP";
import { useAuthorization } from "../../Hooks/UseAuthorization";

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export function PasswordForm() {
  const { user } = useAuthorization();
  const [passwordForm, setPasswordForm] = useState<ChangePassword>({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const changePDW = async () => {
    if (!user?.id) return;
    try {
      await changePassword(passwordForm, user.id);
      alert("Contraseña actualizada correctamente");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        newPasswordConfirmation: "",
      });
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Error al actualizar la contraseña",
      );
    }
  };

  const validatePassword = () => {
    if (passwordForm.newPassword !== passwordForm.newPasswordConfirmation) {
      alert("La contraseña nueva debe coincidir con la confirmacion.");
      return;
    }
    if (
      passwordForm.newPassword.length < 8 ||
      passwordForm.newPasswordConfirmation.length < 8
    ) {
      alert("La nueva contraseña debe tener como minimo 8 caracteres");
      return;
    }
    if (passwordForm.currentPassword.length < 8) {
      alert("La contraseña debe contener como minimo 8 caracteres");
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      alert(
        "La nueva contraseña no puede ser igual que la contraseña anterior",
      );
      return;
    }
    changePDW();
  };

  return (
    <div className="change_password_form">
      <div className="password_title">
        <p>Modificar contraseña</p>
        <button onClick={validatePassword}>Editar informacion</button>
      </div>
      <form action="">
        <label htmlFor="">
          <FontAwesomeIcon className="icon" icon={faKey} />
          <div className="label_data">
            <p>Contraseña anterior</p>
            <input
              onChange={handleChangePassword}
              type="text"
              name="currentPassword"
              value={passwordForm.currentPassword}
            />
          </div>
        </label>
        <label htmlFor="">
          <FontAwesomeIcon className="icon" icon={faLock} />
          <div className="label_data">
            <p>Nueva contraseña</p>
            <input
              onChange={handleChangePassword}
              type="text"
              name="newPassword"
              value={passwordForm.newPassword}
            />
          </div>
        </label>
        <label htmlFor="">
          <FontAwesomeIcon className="icon" icon={faLock} />
          <div className="label_data">
            <p>Confirmar nueva contraseña</p>
            <input
              onChange={handleChangePassword}
              type="text"
              name="newPasswordConfirmation"
              value={passwordForm.newPasswordConfirmation}
            />
          </div>
        </label>
      </form>
    </div>
  );
}
