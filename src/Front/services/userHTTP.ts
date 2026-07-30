import type { ChangePassword } from "../components/User/PasswordForm";
import type { FormEditUser } from "../context/RecuderTypes/Authorization";
import { getHeaders } from "./api";

const apiUrl = import.meta.env.VITE_API_URL;

export async function updateUserInformation(
  userForm: FormEditUser,
  id: string,
) {
  const formData = new FormData();

  formData.append("companyName", userForm.companyName);
  formData.append("emailaddress", userForm.email);
  formData.append("name", userForm.name ?? "");
  formData.append("address", userForm.address ?? "");
  formData.append("phoneNumber", userForm.phoneNumber ?? "");
  formData.append("postalCode", userForm.postalCode ?? "");
  formData.append("city", userForm.city ?? "");

  if (userForm.userImage) {
    formData.append("userImage", userForm.userImage);
  }

  const response = await fetch(`${apiUrl}/usuario/modificar/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Error al actualizar usuario: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function changePassword(passwordForm: ChangePassword, id: string) {
  const response = await fetch(`${apiUrl}/usuario/modificar/pwd/${id}`, {
    method: "PUT",
    headers: {
      ...getHeaders(),
      "content-type": "application/json",
    },
    body: JSON.stringify(passwordForm),
  });
  const data = await response.json();

  if(data.message === 'current password is incorrect'){
    throw new Error("La contraseña que has introducida no es correcta");
    return
  }

  if (!response.ok) {
    throw new Error(data.message || "Error al cambiar la contraseña");
  }
  return data;
}
