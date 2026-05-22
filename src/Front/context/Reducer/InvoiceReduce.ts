import type { Actions, InvoicesState } from "../RecuderTypes/InvoiceReduce";

export const initialStateInvoices: InvoicesState = {
  invoices: [],
  invoicesValues: {
    totalCombined: 0,
    totalSold: 0,
    totalPrice: 0,
    soldLastUpdate: undefined,
    priceLastUpdate: undefined,
    combinedLastUpdate: undefined,
  },
};

export const invoicesReducer = (state: InvoicesState, action: Actions) => {
  const { type } = action;
  switch (type) {
    case "SET_INVOICES":
      return { ...state, invoices: action.payload };
    case 'SET_INVOICES_VALUES':
      return {...state, invoicesValues: action.payload}
    default:
      return state;
  }
};
