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
  invoiceDetails: {
    createdAt: "",
    id: "",
    itemsList: [],
    state: "",
    total: 0,
    warehouseID: "",
    warehouseName: "",
    clientID: "",
  },
};

export const invoicesReducer = (state: InvoicesState, action: Actions) => {
  const { type } = action;
  switch (type) {
    case "SET_INVOICES":
      return { ...state, invoices: action.payload };
    case "SET_INVOICES_VALUES":
      return { ...state, invoicesValues: action.payload };
    case "SET_INVOICE_DETAILS":
      return { ...state, invoiceDetails: action.payload };
    case "ADD_ONE":
      return {
        ...state,
        invoiceDetails: {
          ...state.invoiceDetails,
          itemsList: state.invoiceDetails.itemsList.map((item) => {
            if (item.id !== action.payload) return item;
            if (item.availableStock <= 1) return item;
            return {
              ...item,
              quantity: item.quantity + 1,
              availableStock: item.availableStock - 1,
            };
          }),
        },
      };
    case "REMOVE_ONE":
      return {
        ...state,
        invoiceDetails: {
          ...state.invoiceDetails,
          itemsList: state.invoiceDetails.itemsList.map((item) => {
            if (item.id !== action.payload) return item;
            if (item.quantity <= 1) return item;

            return {
              ...item,
              quantity: item.quantity - 1,
              availableStock: item.availableStock + 1,
            };
          }),
        },
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        invoiceDetails: {
          ...state.invoiceDetails,
          itemsList: state.invoiceDetails.itemsList.filter(
            (item) => item.id !== action.payload,
          ),
        },
      };
    default:
      return state;
  }
};
