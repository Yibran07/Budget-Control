import { useState, useEffect } from "react";

import Mensaje from "./Mensaje";

import CerrarModal from "../img/cerrar.svg";

const Modal = ({
  setVentanaModal,
  AnimarModal,
  setAnimarModal,
  GuardarGasto,
  GastoEditar,
  setGastoEditar,
}) => {
  const [Nombre, setNombre] = useState("");
  const [Cantidad, setCantidad] = useState("");
  const [Categoria, setCategoria] = useState("");
  const [Id, setId] = useState("");
  const [Fecha, setFecha] = useState("");

  const [MensajeError, setMensajeError] = useState("");

  useEffect(() => {
    if (Object.keys(GastoEditar).length > 0) {
      setNombre(GastoEditar.Nombre);
      setCantidad(GastoEditar.Cantidad);
      setCategoria(GastoEditar.Categoria);
      setId(GastoEditar.Id);
      setFecha(GastoEditar.Fecha);
    }
  }, []);

  const OcultarModal = () => {
    setAnimarModal(false);

    setGastoEditar({});

    setTimeout(() => {
      setVentanaModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([Nombre, Cantidad, Categoria].includes("")) {
      setMensajeError("Todos los campos son obligatorios");

      setTimeout(() => {
        setMensajeError("");
      }, 3000);

      return;
    }

    GuardarGasto({ Nombre, Cantidad, Categoria, Id, Fecha });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={CerrarModal}
          alt="Icono cerrar modal"
          onClick={OcultarModal}
        ></img>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${AnimarModal ? "animar" : "cerrar"}`}
      >
        <legend>{GastoEditar.Nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

        {MensajeError && <Mensaje tipo="error">{MensajeError}</Mensaje>}

        <div className="campo">
          <label htmlFor="Nombre">Nombre Gasto</label>
          <input
            id="Nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={Nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></input>
        </div>

        <div className="campo">
          <label htmlFor="Cantidad">Cantidad</label>
          <input
            id="Cantidad"
            type="Number"
            placeholder="Añade la cantidad del gasto: ej. 300"
            value={Cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          ></input>
        </div>

        <div className="campo">
          <label htmlFor="Categoria">Categoria</label>
          <select
            id="Categoria"
            value={Categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Comida">Comida</option>
            <option value="Casa">Casa</option>
            <option value="Gastos">Gastos Varios</option>
            <option value="Ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="Suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={GastoEditar.Nombre ? "Guardar Cambios" : "Añadir Gasto"}
        ></input>
      </form>
    </div>
  );
};

export default Modal;
