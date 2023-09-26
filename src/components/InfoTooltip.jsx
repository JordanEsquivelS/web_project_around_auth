import React from "react";

function InfoTooltip({ isSuccess }) {
  return (
    <div className="info-tooltip">
      <div className="info-tooltip__wrapper">
        <img
          className="info-tooltip__close"
          src={require("../images/CloseIcon_blanco.svg").default}
          alt="botón de cerrar"
        />
        <div className="info-tooltip__content">
          <img
            className="info-tooltip__image"
            src={
              require(isSuccess
                ? "../images/check-info.svg"
                : "../images/error-info.svg").default
            }
            alt={isSuccess ? "Correcto" : "Error"}
          />
          <p className="info-tooltip__message">
            {isSuccess
              ? "¡Correcto! Ya estás registrado."
              : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
