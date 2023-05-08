import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AccessTokenContext } from "../context/AccessTokenProvider";


const Protect = () => {
  const { accessToken } = useContext(AccessTokenContext);
  return accessToken !== '' ? <Outlet /> : <Navigate to="/"/>;
};

export default Protect;
