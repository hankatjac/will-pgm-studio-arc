import React from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/appContext";

const ProtectedRoute = ({ element }) => {
  const { currentUser } = useContext(AppContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
