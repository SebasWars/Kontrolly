import "../styles/clienst.css";
import { useState } from "react";

import { AddNewClient } from "../components/ClientsC/AddNewClient";
import { ClientSearch } from "../components/ClientsC/ClientSearch";
import { TableClients } from "../components/ClientsC/ClientsTable";

import type { Client } from "../context/RecuderTypes/ClientsReduce";
import { useCreateClient } from "../Hooks/ClientsHooks/CreateNewClient";

export function Clients() {
  const { clientForm, toggleForm } = useCreateClient();
  const isActive = clientForm ? "active" : "";
  const [editClient, setEditClient] = useState<Client | null>(null);
  const handleEditClient = (client: Client | null) => {
    setEditClient(client);
  };

  return (
    <div className={`clientes_main_container ${isActive}`}>
      <header className="clients_container">
        <h1>Clientes</h1>
        <button onClick={() => toggleForm(true)} className="add_new_client">
          Añadir nuevo cliente
        </button>
      </header>
      <div className="clientes_dashboard">
        <div className="title">
          <ClientSearch />
        </div>
        <div className="clients_table">
          <TableClients
            handleEditClient={handleEditClient}
            toggleForm={toggleForm}
          />
        </div>
      </div>
      {clientForm && (
        <AddNewClient
          toggleForm={toggleForm}
          editClient={editClient}
          handleEditClient={handleEditClient}
        />
      )}
    </div>
  );
}
