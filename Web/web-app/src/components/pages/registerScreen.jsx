import React from "react";
import Icon from "../atoms/icons/icons.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Api from "../../Api.jsx";
import "./registerScreen.css";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    backgroundImage: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [backgroundImageErrorMessage, setBackgroundImageErrorMessage] =
    useState("");
  const [hasImageError, setHasImageError] = useState(false);
  const [hasBackgroundImageError, setHasBackgroundImageError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "image") {
      const isImageValid = validateImageUrl(value);
      if (!isImageValid) {
        setImageErrorMessage("Invalid image URL");
        setHasImageError(true);
      } else {
        setImageErrorMessage("");
        setHasImageError(false);
      }
    }

    if (name === "backgroundImage") {
      const isBackgroundImageValid = validateImageUrl(value);
      if (!isBackgroundImageValid) {
        setBackgroundImageErrorMessage("Invalid background image URL");
        setHasBackgroundImageError(true);
      } else {
        setBackgroundImageErrorMessage("");
        setHasBackgroundImageError(false);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isImageValid = validateImageUrl(data.image);
    const isBackgroundImageValid = validateImageUrl(data.backgroundImage);

    if (!isImageValid || !isBackgroundImageValid) {
      setImageErrorMessage(isImageValid ? "" : "URL no válida");
      setBackgroundImageErrorMessage(
        isBackgroundImageValid ? "" : "URL de portada no válida"
      );
      setHasImageError(!isImageValid);
      setHasBackgroundImageError(!isBackgroundImageValid);
      return;
    }

    Api.register(data)
      .then((response) => {
        const exito = "Usuario " + data.username + " registrado con éxito";
        setSuccessMessage(exito);
        setImageErrorMessage("");
        setBackgroundImageErrorMessage("");
        setHasImageError(false);
        setHasBackgroundImageError(false);
        setData({
          username: "",
          email: "",
          password: "",
          image: "",
          backgroundImage: "",
        });
      })
      .catch((error) => {
        console.log("error : ", error);
        const errorUser = error.message || error.error;
        setImageErrorMessage(errorUser);
        setSuccessMessage("");
        setHasImageError(true);
      });
  };

  const handleSubmitBack = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  const validateImageUrl = (url) => {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const extension = url.split(".").pop().toLowerCase();
    const isHttp = url.startsWith("http://") || url.startsWith("https://");
    return isHttp && allowedExtensions.includes(extension);
  };

  return (
    <div className="login-scren">
      <div className="twitter-login-box">
        <Icon name="Twitter" className="twitter-logo" />
        <h2 className="login-heading">
          <span>
            {successMessage ? "Gracias por unirte!" : "Únete a Twitter hoy"}
          </span>{" "}
          {successMessage ? "" : "mismo"}{" "}
        </h2>

        {successMessage && (
          <div className="success-message">
            {successMessage}
            <button className="go-to-home-button" onClick={handleSubmitBack}>
              Regresar
            </button>
          </div>
        )}

        {!successMessage && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuario"
              name="username"
              value={data.username}
              onChange={handleInputChange}
              required
              autoFocus
            />
            <input
              type="text"
              placeholder="Correo electrónico"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              required
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleInputChange}
              required
              autoFocus
            />
            <div className="input-field">
              <input
                type="text"
                placeholder="Image Link"
                name="image"
                value={data.image}
                onChange={handleInputChange}
                required
                autoFocus
              />
              {hasImageError && (
                <div className="error-message">{imageErrorMessage}</div>
              )}
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Background Image"
                name="backgroundImage"
                value={data.backgroundImage}
                onChange={handleInputChange}
                required
                autoFocus
              />
              {hasBackgroundImageError && (
                <div className="error-message">
                  {backgroundImageErrorMessage}
                </div>
              )}
            </div>

            <button type="submit" onSubmit={handleSubmit}>
              Registrarse
            </button>
            {!hasImageError && !hasBackgroundImageError && (
              <div className="error-message">{imageErrorMessage}</div>
            )}
          </form>
        )}

        {!successMessage && (
          <div>
            ¿Tienes una cuenta?
            <Link to="/login"> Inicia sesión</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterScreen;
