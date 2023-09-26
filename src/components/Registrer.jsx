import React, { useState } from "react";
import ojoBlanco from "../images/ojo_blanco.png";
import ojoEsconderBlanco from "../images/ojo_esconderBlanco.png";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      console.log("Formulario enviado!");
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className="registration">
      <h2 className="registration__title">Regístrate</h2>

      <form className="registration__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          required
          className="registration__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="registration__passwordContainer">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            required
            className="registration__input"
            value={password}
            maxLength={10}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            className="registration__togglePassword"
          >
            <img
              className="registration__toggleImg"
              src={showPassword ? ojoEsconderBlanco : ojoBlanco}
              alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            />
          </span>
        </div>

        <button className="registration__button">Regístrate</button>
      </form>

      <span className="registration__link">
        ¿Ya eres miembro?{" "}
        <a href=" " className="registration__linkAnchor">
          Inicia sesión aquí
        </a>
      </span>
    </div>
  );
}

export default Register;
