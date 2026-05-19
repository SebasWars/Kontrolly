export interface InvoicesContextType {
  invoices: Invoice[];

  setInvoices: (invoices: Invoice[]) => void
}

export interface InvoicesState {
  invoices: Invoice[];
}

export type Invoice = {
  date: string;
  id: string;
  state: "sold" | "price";
  total: number;
  warehouse: string;
};

export type Actions = SetInvoices;

interface SetInvoices {
  type: "SET_INVOICES";
  payload: Invoice[];
}