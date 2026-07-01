export interface InvoicesContextType {
  invoices: Invoice[];
  invoicesValues: InvoicesValues;
  invoiceDetails: InvoiceDetails;

  setInvoices: (invoices: Invoice[]) => void;
  setInvoicesValues: (invoicesValues: InvoicesValues) => void;
  setInvoiceDetails: (invoiceDetails: InvoiceDetails) => void;
  addOne: (id: string) => void;
  removeOne: (id: string) => void;
  removeItem: (id: string) => void;
}

export interface InvoicesState {
  invoices: Invoice[];
  invoicesValues: InvoicesValues;
  invoiceDetails: InvoiceDetails;
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
export interface InvoiceDetails {
  createdAt: string;
  id: string;
  itemsList: InvoiceItems[];
  state: string;
  total: number;
  warehouseID: string;
  warehouseName: string;
  clientID: string
}

export interface InvoiceItems {
  description: string;
  id: string;
  name: string;
  purchase_price: number;
  quantity: number;
  availableStock: number;
  sales_price: number;
}

export type Actions =
  | SetInvoices
  | SetInvoicesValues
  | SetInvoiceDetails
  | AddOne
  | RemoveOne
  | RemoveItem;

interface SetInvoices {
  type: "SET_INVOICES";
  payload: Invoice[];
}

interface SetInvoicesValues {
  type: "SET_INVOICES_VALUES";
  payload: InvoicesValues;
}
interface SetInvoiceDetails {
  type: "SET_INVOICE_DETAILS";
  payload: InvoiceDetails;
}

interface AddOne {
  type: "ADD_ONE";
  payload: string;
}

interface RemoveOne {
  type: "REMOVE_ONE";
  payload: string;
}

interface RemoveItem {
  type: "REMOVE_ITEM";
  payload: string;
}
