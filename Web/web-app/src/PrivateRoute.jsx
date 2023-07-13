import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "./layout";
import "./Route.css";

const PrivateRoute = ({ children }) => {
  const isAuth = !!localStorage.getItem("authorization_token");
  return isAuth ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
