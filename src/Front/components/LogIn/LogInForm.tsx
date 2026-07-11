import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import type { LogIn } from "../../Types/LogInTypes";
import { logInHTTP } from "../../services/LoginHTTP";
import { useAuthorization } from "../../Hooks/UseAuthorization";

interface PropTypes {
  showPassword: boolean;
  passwordVisibility: () => void;
  changeForm: () => void;
}

export function LogInForm({
  showPassword,
  passwordVisibility,
  changeForm,
}: PropTypes) {
  const { login } = useAuthorization();
  const [logIn, setLogIn] = useState<LogIn>({
    email: "",
    password: "",
  });

  const logInHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogIn((prev) => ({ ...prev, [name]: value }));
  };

  const sendLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await logInHTTP(logIn);
      if (!data.token || !data.user) return;
      login(data.token, data.user);
    } catch (error) {
      throw new Error("Token was not generated");
    }
  };


  return (
    <div className="login_form">
      <div className="form">
        <h2>Iniciar Sesion</h2>
        <form onSubmit={sendLogIn} action="">
          <label htmlFor="email">
            <p>Correo electronico</p>
            <input
              onChange={logInHandler}
              value={logIn.email}
              name="email"
              id="email"
              type="text"
            />
          </label>
          <label htmlFor="password">
            <p>Contraseña</p>
            <div className="password_input">
              <input
                onChange={logInHandler}
                value={logIn.password}
                name="password"
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
          <input className="login_btn" type="submit" value="Iniciar sesion" />
        </form>
      </div>
      <div className="change_section">
        <p>¿Aun no estas registrado?</p>
        <button onClick={changeForm} className="create_account_btn">
          Crear cuenta nueva
        </button>
      </div>
    </div>
  );
}
