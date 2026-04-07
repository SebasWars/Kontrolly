function Fees() {
  return (
    <div className="fee_information_container">
      <div className="title">
      <h2>Tarifas</h2>
      <p>Total y subtotal</p>
      </div>
      <div className="fee_information_information">
        <section>
          <label>
            Precio unitario
            <input type="number" />
          </label>
          <label>
            Cantidad
            <input type="number" />
          </label>
        </section>
        <div className="precio_total">
        <p>Precio total</p>
        <p>0</p>
        </div>
      </div>
    </div>
  );
}

export default Fees;
