import React, { useEffect, useState } from "react";
import "./sidebar.css";
import Icon from "../atoms/icons/icons.jsx";
import Api from "../../Api.jsx";

const SideBar = ({ button }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await Api.loggedUser();
        setLoggedUser(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const reference = (button) => {
    return links[button] || "/404";
  };

  const links = {
    Inicio: "/home",
    Explorar: "/explore",
    Notificaciones: "/notifications",
    Mensajes: "/messages",
    Guardados: "/bookmarks",
    Listas: "/lists",
    Perfil: loggedUser ? `/user/${loggedUser.id}` : "/login",
    "Más Opciones": "/more",
  };

  return (
    <div className="button-menu">
      <Icon name={`${button}`} />
      <a href={`${reference(button)}`} className="button-text">
        {button}
      </a>
    </div>
  );
};

export default SideBar;
