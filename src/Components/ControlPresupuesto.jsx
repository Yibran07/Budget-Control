import { useState, useEffect } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  Presupuesto,
  setPresupuesto,
  Gastos,
  setGastos,
  setIsValidPresupuesto,
}) => {
  const [Disponible, setDisponible] = useState(0);
  const [Gastado, setGastado] = useState(0);

  const [Porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const TotalGastado = Gastos.reduce(
      (Total, Gasto) => Gasto.Cantidad + Total,
      0
    );
    const TotalDisponible = Presupuesto - TotalGastado;

    //CALCULAR EL PORCENTAJE GASTADO
    const NuevoPorcentaje = (
      ((Presupuesto - TotalDisponible) / Presupuesto) *
      100
    ).toFixed(2);

    setDisponible(TotalDisponible);
    setGastado(TotalGastado);
    setTimeout(() => {
      setPorcentaje(NuevoPorcentaje);
    }, 1500);
  }, [Gastos]);

  const FormatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const Confirmacion = confirm("¿Deseas reiniciar presupuesto y gastos?");

    if (Confirmacion) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: Porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: Porcentaje > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={Porcentaje}
          text={`${Porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {FormatearCantidad(Presupuesto)}
        </p>

        <p className={`${Disponible < 0 && "negativo"}`}>
          <span>Disponible: </span> {FormatearCantidad(Disponible)}
        </p>

        <p>
          <span>Gastado: </span> {FormatearCantidad(Gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
