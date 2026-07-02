import { useState } from "react";
import type { NewClient } from "../../context/RecuderTypes/ClientsReduce";

export function useCreateClient() {
  const [clientForm, setClientForm] = useState(false);
  const toggleForm = (val: boolean) => {
    setClientForm(val);
  };
  const [newClient, setNewClient] = useState<NewClient>({
    companyName: "",
    name: "",
    address: "",
    emailAddress: "",
    phoneNumber: "",
    notes: "",
  });
  const formHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewClient((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!newClient.companyName.trim()) {
      alert("La empresa es obligatoria");
      return false;
    }

    if (!newClient.name.trim()) {
      alert("El nombre es obligatorio");
      return false;
    }

    if (!newClient.address.trim()) {
      alert("La dirrección es obligatoria");
      return false;
    }

    if (!newClient.emailAddress.trim()) {
      alert("El correo es obligatorio");
      return false;
    }
    if (!newClient.phoneNumber.trim()) {
      alert("El numero de telefono es obligatorio");
      return false;
    }

    return true;
  };

  return { clientForm, toggleForm, newClient, formHandler, validateForm };
}
