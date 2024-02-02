import { useState, useEffect } from "react";

import Header from "./Components/Header";
import Modal from "./Components/Modal";
import ListadoGastos from "./Components/ListadoGastos";
import Filtros from "./Components/Filtros";

import { GenerarId } from "./helpers";

import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [Presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("Presupuesto")) ?? 0
  );
  const [IsValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [VentanaModal, setVentanaModal] = useState(false);
  const [AnimarModal, setAnimarModal] = useState(false);

  const [Gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("Gastos")) ?? []
  );

  const [GastoEditar, setGastoEditar] = useState({});

  const [Filtro, setFiltro] = useState("");
  const [GastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(GastoEditar).length > 0) {
      setVentanaModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [GastoEditar]);

  useEffect(() => {
    localStorage.setItem("Presupuesto", Presupuesto ?? 0);
  }, [Presupuesto]);

  useEffect(() => {
    localStorage.setItem("Gastos", JSON.stringify(Gastos) ?? []);
  }, [Gastos]);

  useEffect(() => {
    if (Filtro) {
      //FILTROS GASTOS POR CATEGORIA
      const GastosFiltrados = Gastos.filter(
        (Gasto) => Gasto.Categoria === Filtro
      );
      setGastosFiltrados(GastosFiltrados);
    }
  }, [Filtro]);

  useEffect(() => {
    const PresupuestoLS = Number(localStorage.getItem("Presupuesto")) ?? 0;

    if (PresupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  const handleNuevoGasto = () => {
    setVentanaModal(true);

    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const GuardarGasto = (Gasto) => {
    if (Gasto.Id) {
      //ACTUALIZAR
      const GastoActualizado = Gastos.map((GastoState) =>
        GastoState.Id === Gasto.Id ? Gasto : GastoState
      );
      setGastos(GastoActualizado);
      setGastoEditar({});
    } else {
      //NUEVO GASTO
      Gasto.Id = GenerarId();
      Gasto.Fecha = Date.now();
      setGastos([...Gastos, Gasto]);
    }

    setAnimarModal(false);

    setTimeout(() => {
      setVentanaModal(false);
    }, 500);
  };

  const EliminarGasto = (Id) => {
    const GastosActualizados = Gastos.filter((Gasto) => Gasto.Id !== Id);
    setGastos(GastosActualizados);
  };

  return (
    <div className={VentanaModal ? "fijar" : ""}>
      <Header
        Presupuesto={Presupuesto}
        setPresupuesto={setPresupuesto}
        IsValidPresupuesto={IsValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        Gastos={Gastos}
        setGastos={setGastos}
      />

      {IsValidPresupuesto && (
        <>
          <main>
            <Filtros Filtro={Filtro} setFiltro={setFiltro} />
            <ListadoGastos
              Gastos={Gastos}
              setGastoEditar={setGastoEditar}
              EliminarGasto={EliminarGasto}
              Filtro={Filtro}
              GastosFiltrados={GastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            ></img>
          </div>
        </>
      )}

      {VentanaModal && (
        <Modal
          setVentanaModal={setVentanaModal}
          AnimarModal={AnimarModal}
          setAnimarModal={setAnimarModal}
          GuardarGasto={GuardarGasto}
          GastoEditar={GastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
