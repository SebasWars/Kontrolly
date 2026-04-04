function BasicInfo() {
  return (
    <div className="basic_information_container">
      <h1>Informacion Bascica</h1>
      <div className="basic_information">
        <label>
          Nombre:
          <input type="text" />
        </label>
        <label>
          Descripcion:
          <input type="text" />
        </label>
      </div>
    </div>
  );
}

export default BasicInfo