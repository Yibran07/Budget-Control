import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";

const Header = ({
  Presupuesto,
  setPresupuesto,
  IsValidPresupuesto,
  setIsValidPresupuesto,
  Gastos,
  setGastos,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {IsValidPresupuesto ? (
        <ControlPresupuesto
          Presupuesto={Presupuesto}
          setPresupuesto={setPresupuesto}
          Gastos={Gastos}
          setGastos={setGastos}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      ) : (
        <NuevoPresupuesto
          Presupuesto={Presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
