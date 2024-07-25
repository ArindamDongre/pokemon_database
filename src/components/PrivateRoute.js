// src/components/PrivateRoute.js

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, ...rest }) => {
  const users = useSelector((state) => state.user.users);
  const location = useLocation();
  const isAuthenticated = users.length > 0; // Adjust based on your auth logic

  if (!isAuthenticated) {
    // Redirect to the login page with the current location to allow redirecting back after login
    return <Navigate to="/" state={{ from: location }} />;
  }

  return element;
};

export default PrivateRoute;
