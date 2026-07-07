import { useEffect } from "react";
import { useClients } from "../../Hooks/UseClients";
import { ClienRowList } from "./ClientRowList";
import { useFetchClients } from "../../Hooks/ClientsHooks/useFetchClients";
import type { Client } from "../../context/RecuderTypes/ClientsReduce";

interface PropTypes {
  handleEditClient: (clietn: Client | null) => void;
  toggleForm: (val: boolean) => void;
}

export function TableClients({ handleEditClient, toggleForm }: PropTypes) {
  const { clientList, setClientList } = useClients();
  const { clientsList } = useFetchClients();

  useEffect(() => {
    clientsList();
    return () => {
      setClientList([]);
    };
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Compañia</th>
          <th>Cliente</th>
          <th>Correo Electronico</th>
          <th>Nº Movil</th>
          <th>Dirrección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientList.map((client, index) => (
          <ClienRowList
            key={index}
            client={client}
            handleEditClient={handleEditClient}
            toggleForm={toggleForm}
          />
        ))}
      </tbody>
    </table>
  );
}
