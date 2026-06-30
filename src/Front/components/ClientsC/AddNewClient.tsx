type PropTypes = {
    toggleForm : (val: boolean) => void 
}

export function AddNewClient({toggleForm}: PropTypes) {
  return (
    <div className="add_new_client_container">
      <header className="add_client_header">
        <h2>Añadir nuevo cliente</h2>
        <button onClick={() => toggleForm(false)} className="close_client_form_btn">x</button>
      </header>

      <div className="add_client_form">
        <form action="">
          <label className="company_name" htmlFor="">
            Empresa
            <input type="text" name="" id="" />
          </label>
          <div className="form_section">
            <label htmlFor="">
              Contacto directo
              <input type="text" name="" id="" />
            </label>
            <label htmlFor="">
              Dirección
              <input type="text" name="" id="" />
            </label>
          </div>
          <div className="form_section">
            <label htmlFor="">
              Numero de contacto
              <input type="text" name="" id="" />
            </label>
            <label htmlFor="">
              Correo electronico
              <input type="email" name="" id="" />
            </label>
          </div>

          <label htmlFor="">
            Notas
            <textarea name="" id=""></textarea>
          </label>
        </form>
      </div>

      <div className="new_client_action_buttons">
        <button onClick={() => toggleForm(false)}>Cancelar</button>
        <button>Guardar</button>
      </div>
    </div>
  );
}
