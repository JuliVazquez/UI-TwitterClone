import React from "react";
import { Navigate } from "react-router-dom";
import "./Route.css";

const PublicRoute = ({ children }) => {
  const isAuth = !!localStorage.getItem("authorization_token");
  return isAuth ? <Navigate to="/home" replace /> : [children];
};

export default PublicRoute;
