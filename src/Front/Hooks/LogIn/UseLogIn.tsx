import { useState } from "react";
import { logInHTTP } from "../../services/LoginHTTP";
import type { LogIn } from "../../Types/LogInTypes";
import { useAuthorization } from "../UseAuthorization";

export const useLogIn = () => {
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
  return { logIn, logInHandler, sendLogIn };
};
