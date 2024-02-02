import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
  Presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [MensajeError, setMensajeError] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!Presupuesto || Presupuesto < 0) {
      setMensajeError("No es un presupuesto valido");
      return;
    }
    setMensajeError("");
    setIsValidPresupuesto(true);
  };

  return (
    <div className="contener-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="Number"
            placeholder="Añade tu Presupuesto"
            value={Presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          ></input>
        </div>

        <input type="submit" value="Añadir"></input>

        {MensajeError && <Mensaje tipo="error">{MensajeError}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
