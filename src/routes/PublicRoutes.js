import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../utils/context/UserAuthContext";

const PublicRoutes = () => {
  const { user } = useUserAuth();
 
  // return (user ? <Outlet /> : <Navigate to="/" />);
  if (user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;

};
export default PublicRoutes;


