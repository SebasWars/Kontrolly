import { createContext, useReducer, type ReactNode } from "react";
import type {
  Invoice,
  InvoiceDetails,
  InvoicesContextType,
  InvoicesValues,
} from "../RecuderTypes/InvoiceReduce";
import {
  initialStateInvoices,
  invoicesReducer,
} from "../Reducer/InvoiceReduce";

interface PropType {
  children: ReactNode;
}

export const InvoicesContext = createContext<InvoicesContextType | undefined>(
  undefined,
);

export const InvoicesProvider = ({ children }: PropType) => {
  const [state, dispatch] = useReducer(invoicesReducer, initialStateInvoices);

  const setInvoices = (invoices: Invoice[]) => {
    dispatch({ type: "SET_INVOICES", payload: invoices });
  };

  const setInvoicesValues = (invoicesValues: InvoicesValues) => {
    dispatch({ type: "SET_INVOICES_VALUES", payload: invoicesValues });
  };

  const setInvoiceDetails = (invoiceDetails: InvoiceDetails) => {
    dispatch({ type: "SET_INVOICE_DETAILS", payload: invoiceDetails });
  };

  const addOne = (id: string) => {
    dispatch({ type: "ADD_ONE", payload: id });
    console.log('add')
  };

  const removeOne = (id: string) => {
    dispatch({ type: "REMOVE_ONE", payload: id });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  return (
    <InvoicesContext.Provider
      value={{
        invoices: state.invoices,
        invoicesValues: state.invoicesValues,
        invoiceDetails: state.invoiceDetails,

        setInvoices,
        setInvoicesValues,
        setInvoiceDetails,
        addOne,
        removeOne,
        removeItem,
      }}
    >
      {children}
    </InvoicesContext.Provider>
  );
};
