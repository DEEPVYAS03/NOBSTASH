import useAuth from "@/redux/dispatch/useAuth";
import React, { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";

function PersistentLogin() {
  const { refershToken, auth } = useAuth();

  useLayoutEffect(() => {
    refershToken();
  }, []);

  if (auth.loading) return <div>Loading...</div>;

  return <>{<Outlet />}</>;
}

export default PersistentLogin;
