import { createContext, useReducer, type ReactNode } from "react";
import type {
  Invoice,
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

  return (
    <InvoicesContext.Provider
      value={{
        invoices: state.invoices,

        setInvoices,
        setInvoicesValues
      }}
    >
      {children}
    </InvoicesContext.Provider>
  );
};
