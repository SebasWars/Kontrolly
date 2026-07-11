import { useContext } from "react";
import { AuthorizationContext } from "../context/Providers/AuthorizationProvider";

export function useAuthorization() {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error("Context could not be found");
  }
  return context;
}
