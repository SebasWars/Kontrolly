function BasicInfo() {
  return (
    <div className="basic_information_container">
      <div className="title">
        <h2>Basico</h2>
        <p>Informacion Basica</p>
      </div>
      <div className="basic_information">
        <label>
          Nombre del producto
          <input type="text" />
        </label>
        <label>
          Descripción
          <input type="text" />
        </label>
      </div>
    </div>
  );
}

export default BasicInfo