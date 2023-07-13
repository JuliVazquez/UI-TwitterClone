import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css"; // Importa el archivo CSS personalizado

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/home"); // Navegar a la ruta "/home"
  };

  return (
    <div className="not-found-page">
      <p className="error-text">Lo siento, la página no existe.</p>
      <img
        src="https://media.tenor.com/xDuICvqqTJUAAAAC/twitter-blood.gif"
        alt="Error 404"
        className="error-image"
      />
      <button className="navigate-home-button" onClick={handleNavigateHome}>
        <span className="navigate-home-button-text">Volver</span>
      </button>
    </div>
  );
};

export default NotFoundPage;

// src="https://content.thriveglobal.com/wp-content/uploads/2018/12/1fl05_QKT0UyBP7kZ-auoXA.gif"
