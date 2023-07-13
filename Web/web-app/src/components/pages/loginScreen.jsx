import React from "react";
import { useState } from "react";
import "./loginScreen.css";
import Icon from "../atoms/icons/icons.jsx";
import { useNavigate } from "react-router-dom";
import Api from "../../Api.jsx";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Api.login(data)
      .then((response) => {
        localStorage.setItem(
          "authorization_token",
          response.headers.authorization
        );
        navigate("/home");
      })
      .catch((error) => {
        console.log("error : ", error.message);
        setError(
          error.response?.data?.message || "Usuario o Password incorrectos."
        );
      });
  };

  return (
    <div className="login-scren">
      <div className="twitter-login-box">
        <Icon name="Twitter" className="twitter-logo" />
        <h2 className="login-heading">
          <span>Inicia sesión en</span>
          <span>Twitter</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            <input
              type="text"
              placeholder="Usuario"
              name="username"
              value={data.username}
              onChange={handleInputChange}
              required
              autoFocus
            ></input>
          </label>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              value={data.password}
              onChange={handleInputChange}
              required
            ></input>
          </label>
          <button type="submit">Iniciar sesión</button>
        </form>
        <div className="signup-link">
          <span className="signup-link__text">¿No tienes una cuenta?</span>
          <a href="/register" className="signup-link__register">
            Regístrate
          </a>
        </div>
        {error && <div className="error-box">{error}</div>}
      </div>
    </div>
  );
};

export default LoginScreen;
