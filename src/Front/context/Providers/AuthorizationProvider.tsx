import { createContext, useState, type ReactNode } from "react";
import type { AuthorizationContextType, AuthorizationType, User } from "../RecuderTypes/Authorization";

interface PropType {
  children: ReactNode;
}

export const AuthorizationContext = createContext<
  AuthorizationContextType | undefined
>(undefined);

export const AuthorizationProvider = ({ children }: PropType) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  const [authorization, setAuthorization] = useState<AuthorizationType>({
    user,
    token: localStorage.getItem("token"),
    loading: false,
  });

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setAuthorization({
      user,
      token,
      loading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthorization({
      user: null,
      token: null,
      loading: false,
    });
  };

  return (
    <AuthorizationContext.Provider
      value={{
        user: authorization.user,
        token: authorization.token,
        loading: authorization.loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};
