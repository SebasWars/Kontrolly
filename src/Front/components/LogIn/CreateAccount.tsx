import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCreateAccount } from "../../Hooks/LogIn/UseCreateAccount";

interface PropTypes {
  showPassword: boolean;
  passwordVisibility: () => void;
  changeForm: () => void;
}

export function CreateAccount({
  showPassword,
  passwordVisibility,
  changeForm,
}: PropTypes) {
  const { newAccount, newAccountHandler, createUser } = useCreateAccount();

  return (
    <div className="create_account_form">
      <div className="form">
        <h2>Crear Cuenta</h2>
        <form onSubmit={createUser} action="">
          <label htmlFor="company">
            <p>Empresa</p>
            <input
              value={newAccount.companyName}
              name="companyName"
              onChange={newAccountHandler}
              id="company"
              type="text"
            />
          </label>
          <label htmlFor="user_name">
            <p>Correo electronico</p>
            <input
              value={newAccount.email}
              name="email"
              onChange={newAccountHandler}
              id="user_name"
              type="email"
            />
          </label>
          <label htmlFor="password">
            <p>Contraseña</p>
            <div className="password_input">
              <input
                value={newAccount.password}
                name="password"
                onChange={newAccountHandler}
                id="password"
                type={showPassword ? "text" : "password"}
              />
              <FontAwesomeIcon
                onClick={passwordVisibility}
                className="see_password_btn"
                icon={showPassword ? faEyeSlash : faEye}
              />
            </div>
          </label>
          <label htmlFor="password">
            <p>Confirmar contraseña</p>
            <div className="password_input">
              <input
                value={newAccount.passwordConfirm}
                name="passwordConfirm"
                onChange={newAccountHandler}
                id="password"
                type={showPassword ? "text" : "password"}
              />
              <FontAwesomeIcon
                onClick={passwordVisibility}
                className="see_password_btn"
                icon={showPassword ? faEyeSlash : faEye}
              />
            </div>
          </label>
          <button className="create_account_btn" type="submit">
            Crear cuenta
          </button>
        </form>
      </div>
      <div className="change_section">
        <p>¿Ya tienes una cuenta?</p>
        <button onClick={changeForm} className="go_to_login">
          Iniciar sesion
        </button>
      </div>
    </div>
  );
}
