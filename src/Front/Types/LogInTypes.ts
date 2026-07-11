export type Form = "login" | "create";

export interface LogIn {
  email: string;
  password: string;
}

export interface NewAccount {
  companyName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
