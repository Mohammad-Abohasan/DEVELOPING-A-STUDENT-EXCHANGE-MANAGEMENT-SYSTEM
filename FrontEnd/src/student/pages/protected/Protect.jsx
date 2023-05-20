import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AccessTokenContext } from "../../../context/AccessTokenProvider";


const Protect = () => {
  const { accessToken } = useContext(AccessTokenContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return accessToken ? <Outlet /> : <Navigate to="/" />;
};

export default Protect;
