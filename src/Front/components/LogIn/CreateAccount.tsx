import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import type { NewAccount } from "../../Types/LogInTypes";
import { createAccount } from "../../services/LoginHTTP";
import { useAuthorization } from "../../Hooks/UseAuthorization";

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
  const { login } = useAuthorization();
  const [newAccount, setNewAccount] = useState<NewAccount>({
    companyName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const newAccountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (newAccount.password !== newAccount.passwordConfirm) {
        alert("La contraseña no coincide con la confirmación.");
      }
      const data = await createAccount(newAccount);
      login(data.token, data.user);
    } catch (error) {
      throw new Error("It was not possible to create a new account.");
    }
  };

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
