import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { FormatearFecha } from "../helpers";
import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSuscripcion from "../img/icono_suscripciones.svg";

const DiccionarioIconos = {
  Ahorro: IconoAhorro,
  Comida: IconoComida,
  Casa: IconoCasa,
  Gastos: IconoGastos,
  Ocio: IconoOcio,
  Salud: IconoSalud,
  Suscripciones: IconoSuscripcion,
};

const Gasto = ({ DatosGasto, setGastoEditar, EliminarGasto }) => {
  const { Nombre, Cantidad, Categoria, Id, Fecha } = DatosGasto;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(DatosGasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => EliminarGasto(DatosGasto.Id)}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={DiccionarioIconos[Categoria]}></img>

            <div className="descripcion-gasto">
              <p className="categoria">{Categoria}</p>
              <p className="nombre-gasto">{Nombre}</p>
              <p className="fecha-gasto">
                Agregado el: {""} <span>{FormatearFecha(Fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${Cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
