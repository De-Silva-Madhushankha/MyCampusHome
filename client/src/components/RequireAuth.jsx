import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const RequireAuth = () => {
  const { user, loading } = useAuth();

  // Show a loading indicator while user authentication is being verified
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
