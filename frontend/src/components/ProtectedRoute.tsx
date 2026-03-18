import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC = () => {

  const location = useLocation();
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;