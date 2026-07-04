import type {
  Actions,
  ClientsInitialState,
} from "../RecuderTypes/ClientsReduce";

export const clientsInitialState: ClientsInitialState = {
  clientsResume: [],
  clientList: [],
  client: {
    id: "",
    companyName: "",
    name: "",
    emailAddress: "",
    phoneNumber: "",
    address: "",
  },
};

export const clientsReducer = (state: ClientsInitialState, action: Actions) => {
  const { type } = action;
  switch (type) {
    case "SET_CLIENT_RESUME":
      return { ...state, clientsResume: action.payload };
    case "SET_CLIENTS_LIST":
      return { ...state, clientList: action.payload };
    case 'SET_CLIENT':
      return {...state, client: action.payload}
    case 'CLEAR_CLIENT':
      return {...state, client: clientsInitialState.client}
    default:
      return state;
  }
};
