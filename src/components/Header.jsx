import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (location.pathname.includes("/signin")) {
      navigate("/signup");
    } else {
      navigate("/signin");
    }
  };

  return (
    <header className="header">
      <div className="header header__logo">
        <img
          className="header__logo header__logo_image"
          src={require("../images/logo.svg").default}
          alt="Logo Around"
        />
        <span className="header__emailLogin"> </span>
        <button className="header__login" onClick={handleLoginClick}>
          {location.pathname.includes("/signin")
            ? "Regístrate"
            : "Iniciar sesión"}
        </button>
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
