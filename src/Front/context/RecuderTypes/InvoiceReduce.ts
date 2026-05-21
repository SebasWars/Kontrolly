export interface InvoicesContextType {
  invoices: Invoice[];

  setInvoices: (invoices: Invoice[]) => void;
  setInvoicesValues: (invoicesValues: InvoicesValues) => void;
}

export interface InvoicesState {
  invoices: Invoice[];
  invoicesValues: InvoicesValues;
}

export type Invoice = {
  date: string;
  id: string;
  state: "sold" | "price";
  total: number;
  warehouseID: string;
};

export type InvoicesValues = {
  totalCombined: number;
  totalSold: number;
  totalPrice: number;
  soldLastUpdate: string | undefined;
  priceLastUpdate: string | undefined;
  combinedLastUpdate: string | undefined;
};

export type Actions = SetInvoices | SetInvoicesValues;

interface SetInvoices {
  type: "SET_INVOICES";
  payload: Invoice[];
}

interface SetInvoicesValues {
  type: 'SET_INVOICES_VALUES',
  payload: InvoicesValues
}
