function Fees() {
  return (
    <div className="fee_information_container">
      <h1>Tarifas</h1>
      <div className="fee_information_information">
        <section>
          <label>
            Precio unitario:
            <input type="number" />
          </label>
          <label>
            Cantidad:
            <input type="number" />
          </label>
        </section>
      </div>
    </div>
  );
}

export default Fees;
