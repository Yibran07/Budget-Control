import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({
  Gastos,
  setGastoEditar,
  EliminarGasto,
  Filtro,
  GastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {Filtro ? (
        <>
          <h2>
            {GastosFiltrados.length
              ? "Gastos"
              : "No hay gastos en esta categoria"}
          </h2>
          {GastosFiltrados.map((Gastos) => (
            <Gasto
              key={Gastos.Id}
              DatosGasto={Gastos}
              setGastoEditar={setGastoEditar}
              EliminarGasto={EliminarGasto}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{Gastos.length ? "Gastos" : "No hay gastos"}</h2>
          {Gastos.map((Gastos) => (
            <Gasto
              key={Gastos.Id}
              DatosGasto={Gastos}
              setGastoEditar={setGastoEditar}
              EliminarGasto={EliminarGasto}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
