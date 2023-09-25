import React, { useState } from "react";

function Header() {
  // Estado para determinar si el popup de inicio de sesión está abierto o no
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  // Función para manejar el click en el span
  const handleLoginClick = () => {
    // Abrir o cerrar el popup. Aquí también puedes agregar la lógica para mostrar el popup.
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };
  return (
    <header className="header">
      <div className="header header__logo">
        <img
          className="header__logo header__logo_image"
          src={require("../images/logo.svg").default}
          alt="Logo Around"
        />
        <button className="header__login" onClick={handleLoginClick}>
        {isLoginPopupOpen ? "Regístrate" : "Iniciar sesión"}
      </button>
      </div>

      <div className="header__line"></div>
    </header>
  );
}

export default Header;
