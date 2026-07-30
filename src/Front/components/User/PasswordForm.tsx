import { faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function PasswordForm() {
  return (
    <div className="change_password_form">
      <div className="password_title">
        <p>Modificar contraseña</p>
        <button>Editar informacion</button>
      </div>
      <form action="">
        <label htmlFor="">
          <FontAwesomeIcon className="icon" icon={faKey} />
          <div className="label_data">
            <p>Contraseña anterior</p>
            <input type="text" />
          </div>
        </label>
        <label htmlFor="">
          <FontAwesomeIcon className="icon" icon={faLock} />
          <div className="label_data">
            <p>Nueva contraseña</p>
            <input type="text" />
          </div>
        </label>
        <label htmlFor="">
          <FontAwesomeIcon className="icon" icon={faLock} />
          <div className="label_data">
            <p>Confirmar nueva contraseña</p>
            <input type="text" />
          </div>
        </label>
      </form>
    </div>
  );
}
