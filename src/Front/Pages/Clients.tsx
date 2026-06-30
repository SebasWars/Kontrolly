import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/clienst.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { AddNewClient } from "../components/ClientsC/AddNewClient";
import { useState } from "react";
import DropDown from "../components/ClientsC/DropDonwClientOpt";

export function Clients() {
  const [clientForm, setClientForm] = useState(false);
  const toggleForm = (val: boolean) => {
    setClientForm(val);
  };

  const isActive = clientForm ? "active" : "";

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
          <div className="input">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input className="search_client" type="text" />
          </div>
        </div>
        <div className="clients_table">
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Correo Electronico</th>
                <th>Nº Movil</th>
                <th>Dirrección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => {
                return (
                  <tr key={index}>
                    <td>{client.name}</td>
                    <td>{client.emailAddress}</td>
                    <td>{client.phoneNumber}</td>
                    <td>{client.address}</td>
                    <td><DropDown/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {clientForm && <AddNewClient toggleForm={toggleForm} />}
    </div>
  );
}

interface Clients {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
}

export const clients: Clients[] = [
  {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
  {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
  {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
    {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
  {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
  {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
    {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
  {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
  {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
    {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
  {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
  {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
    {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
  {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
  {
    name: "Dulce hermosa",
    emailAddress: "dulcecitachiqita@gmail.com",
    phoneNumber: "673848272",
    address: "Carrer dulce 4",
  },
  
];
