import type { LogIn } from "../Types/LogInTypes";

const apiUrl = import.meta.env.VITE_API_URL;

export async function logInHTTP(loginForm: LogIn) {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(loginForm),
  });
  const data = await response.json();
  return data;
}

export async function createAccount() {}
