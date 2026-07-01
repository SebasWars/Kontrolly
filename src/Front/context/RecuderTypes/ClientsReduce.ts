export interface ClientsInitialState {
  clientsResume: ClientResume[];
  clientList: Client[];
  client: Client
}

export interface ClientsContextType {
  clientsResume: ClientResume[];
  clientList: Client[];
  client: Client;

  setClientsResume: (clients: ClientResume[]) => void;
  setClientList: (clienstList: Client[]) => void;
  setClient: (client: Client) => void;
}

export interface ClientResume {
  id: string;
  companyName: string;
}

export interface Client extends ClientResume {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
}

export interface NewClient {
  companyName: string;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
}

export type Actions = SetClientResume | SetClientsList | SetClient

type SetClientResume = {
  type: "SET_CLIENT_RESUME";
  payload: ClientResume[];
};

type SetClientsList = {
  type: "SET_CLIENTS_LIST";
  payload: Client[];
};

type SetClient = {
  type: 'SET_CLIENT',
  payload: Client
}
