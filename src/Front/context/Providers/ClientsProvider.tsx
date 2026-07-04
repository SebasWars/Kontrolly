import { createContext, useReducer, type ReactNode } from "react";
import type { Client, ClientResume, ClientsContextType } from "../RecuderTypes/ClientsReduce";
import { clientsInitialState, clientsReducer } from "../Reducer/ClientsReduce";
type PropType = {
  children: ReactNode;
};

export const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export const ClientsProvider = ({ children }: PropType) => {
  const [state, dispatch] = useReducer(clientsReducer, clientsInitialState);

  const setClientsResume = (clients: ClientResume[]) => {
    dispatch({ type: "SET_CLIENT_RESUME", payload: clients });
  };

  const setClientList = (clientsList: Client[]) => {
    dispatch({ type: "SET_CLIENTS_LIST", payload: clientsList });
  };

  const setClient = (client: Client) => {
    dispatch({type:'SET_CLIENT', payload: client})
  }

  const clearClient = () => {
    dispatch({type: 'CLEAR_CLIENT'})
  }

  return (
    <ClientsContext.Provider
      value={{
        clientList: state.clientList,
        clientsResume: state.clientsResume,
        client: state.client,

        setClientsResume,
        setClientList,
        setClient,
        clearClient
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};
