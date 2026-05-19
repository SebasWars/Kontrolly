import type { Actions, InvoicesState } from "../RecuderTypes/InvoiceReduce";

export const initialStateInvoices: InvoicesState = {
  invoices: [],
};

export const invoicesReducer = (state: InvoicesState, action: Actions) => {
  const { type } = action;
  switch (type) {
    case 'SET_INVOICES':
      return {...state, invoices: action.payload}
    default:
      return state;
  }
};