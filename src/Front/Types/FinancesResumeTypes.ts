export type TypeAllow = "sales" | "orders" | "income" | "invesment";
export type Type = "month" | "day";

export type Finances = {
  title: string;
  type: TypeAllow;
  value: number;
};

export type LastOrders = {
  warehouse: string;
  date: string;
  total: number;
};

export interface InitialStateSalesResume {
  finances: Finances[];
  lastOrdes: LastOrders[];
}

export type SalesRegisterYear = {
  month: string;
  total: number;
};

export type SalesRegisterMonth = {
  day: string;
  total: number;
};

export type SalesRegister = SalesRegisterYear[] | SalesRegisterMonth[];
