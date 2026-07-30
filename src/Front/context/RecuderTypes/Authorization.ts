export interface User {
  id: string;
  name: string | null;
  userImage: string | null;
  companyName: string;
  email: string;
  address: string | null;
  phoneNumber: string | null;
  postalCode: string | null;
  city: string | null;
}

export interface FormEditUser {
  name: string | null;
  userImage: File | null;
  companyName: string;
  email: string;
  address: string | null;
  phoneNumber: string | null;
  postalCode: string | null;
  city: string | null;
}

export interface AuthorizationContextType {
  user: User | null;
  token: string | null;
  loading: boolean;

  login: (token: string, user: User) => void;
  logout: () => void;
  updateUserFunc: (user: User) => void;
}

export interface AuthorizationType {
  user: User | null;
  token: string | null;
  loading: boolean;
}
