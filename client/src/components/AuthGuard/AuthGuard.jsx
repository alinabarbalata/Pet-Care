import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../../state/AppContext";

const AuthGuard = ({ children }) => {
  const { user } = useContext(AppContext);

  if (!user?.data?.token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;
