import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Header({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser, setUser } = useContext(CurrentUserContext);

  const handleLoginClick = () => {
    if (currentUser) {
      setUser(null);
      localStorage.removeItem("jwt");
      onLogout();
      navigate("/signin");
      return;
    }

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
        <span className="header__emailLogin">
          {currentUser ? currentUser.email : ""}
        </span>

        <button className="header__login" onClick={handleLoginClick}>
          {currentUser
            ? "Cerrar sesión"
            : location.pathname.includes("/signin")
            ? "Regístrate"
            : "Iniciar sesión"}
        </button>
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
