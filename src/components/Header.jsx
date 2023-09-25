import React from "react";

function Header() {
  return (
    <header className="header">
      <div className="header header__logo">
        <img
          className="header__logo header__logo_image"
          src={require("../images/logo.svg").default}
          alt="Logo Around"
        />
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
