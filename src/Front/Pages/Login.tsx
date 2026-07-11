import { useState } from "react";
import { LogInForm } from "../components/LogIn/LogInForm";
import "../styles/Login.css";
import { CreateAccount } from "../components/LogIn/CreateAccount";
import type { Form } from "../Types/LogInTypes";

export function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentForm, setcurrentForm] = useState<Form>("login");
  const passwordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const changeForm = () => {
    setcurrentForm((prev) => (prev === "login" ? "create" : "login"));
  };
  return (
    <div className="log_in_container">
      <div className="header">
        <h1>BIENVENIDO A KONTROLLY</h1>
        <p>
          La herramienta que te ayuda a gestionar tu negocio de una manera más
          eficiente.
        </p>
      </div>
      {currentForm === "login" ? (
        <LogInForm
          showPassword={showPassword}
          passwordVisibility={passwordVisibility}
          changeForm={changeForm}
        />
      ) : (
        <CreateAccount
          showPassword={showPassword}
          passwordVisibility={passwordVisibility}
          changeForm={changeForm}
        />
      )}
    </div>
  );
}
