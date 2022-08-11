import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const NoUser = ({ user }) => {
  if (user) {
    return <Navigate to="/" replace></Navigate>;
  }
  return <Outlet></Outlet>;
};

export default NoUser;
