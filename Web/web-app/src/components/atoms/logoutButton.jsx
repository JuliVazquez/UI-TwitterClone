import { useCallback } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = useCallback((event) => {
    event.preventDefault();
    localStorage.removeItem("authorization_token");
    navigate("/login");
  }, [navigate]);

  return (
    <button className="button-logout" onClick={logout}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
