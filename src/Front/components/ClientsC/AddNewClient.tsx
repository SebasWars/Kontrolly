import { useFetchClients } from "../../Hooks/ClientsHooks/useFetchClients";
import { CreateClient } from "../../Hooks/ClientsHooks/CreateNewClient";

type PropTypes = {
  toggleForm: (val: boolean) => void;
};

export function AddNewClient({ toggleForm }: PropTypes) {
  const { createNewClient } = useFetchClients();
  const { newClient, formHandler, validateForm } = CreateClient();

  const createClient = () => {
    if (!validateForm()) return;
    createNewClient(newClient);
    toggleForm(false);
  };

  return (
    <div className="add_new_client_container">
      <header className="add_client_header">
        <h2>Añadir nuevo cliente</h2>
        <button
          onClick={() => toggleForm(false)}
          className="close_client_form_btn"
        >
          x
        </button>
      </header>

      <div className="add_client_form">
        <form action="">
          <label className="company_name" htmlFor="companyName">
            Empresa
            <input
              value={newClient.companyName}
              onChange={formHandler}
              type="text"
              name="companyName"
              id="companyName"
            />
          </label>
          <div className="form_section">
            <label htmlFor="name">
              Contacto directo
              <input
                value={newClient.name}
                onChange={formHandler}
                type="text"
                name="name"
                id="name"
              />
            </label>
            <label htmlFor="address">
              Dirección
              <input
                value={newClient.address}
                onChange={formHandler}
                type="text"
                name="address"
                id="address"
              />
            </label>
          </div>
          <div className="form_section">
            <label htmlFor="phoneNumber">
              Numero de contacto
              <input
                value={newClient.phoneNumber}
                onChange={formHandler}
                type="text"
                name="phoneNumber"
                id="phoneNumber"
              />
            </label>
            <label htmlFor="emailAddress">
              Correo electronico
              <input
                value={newClient.emailAddress}
                onChange={formHandler}
                type="email"
                name="emailAddress"
                id="emailAddress"
              />
            </label>
          </div>

          <label htmlFor="notes">
            Notas
            <textarea
              value={newClient.notes}
              onChange={formHandler}
              name="notes"
              id="notes"
            ></textarea>
          </label>
        </form>
      </div>

      <div className="new_client_action_buttons">
        <button onClick={() => toggleForm(false)}>Cancelar</button>
        <button onClick={createClient}>Guardar</button>
      </div>
    </div>
  );
}
