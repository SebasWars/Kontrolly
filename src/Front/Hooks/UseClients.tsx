import { useContext } from "react";
import { ClientsContext } from "../context/Providers/ClientsProvider";

export function useClients() {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error("Context could not be found");
  }

  return context;
}
