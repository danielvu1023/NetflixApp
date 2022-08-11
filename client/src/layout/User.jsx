import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const User = ({ user }) => {
  if (!user) {
    return <Navigate to="/register" replace></Navigate>;
  }
  return <Outlet></Outlet>;
};

export default User;
