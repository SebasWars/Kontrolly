export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthorizationContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (token: string, user: User) => void;
  logout: () => void;
}

export interface AuthorizationType {
  user: User | null;
  token: string | null;
  loading: boolean;
}
