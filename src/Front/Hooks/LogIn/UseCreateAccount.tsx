import { useState } from "react";
import type { NewAccount } from "../../Types/LogInTypes";
import { createAccount } from "../../services/LoginHTTP";
import { useAuthorization } from "../UseAuthorization";

export const useCreateAccount = () => {
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

  return { newAccount, newAccountHandler, createUser };
};
