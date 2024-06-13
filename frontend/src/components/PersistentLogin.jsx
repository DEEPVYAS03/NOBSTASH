import useAuth from '@/redux/dispatch/useAuth';
import React, { useEffect, useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';

function PersistentLogin() {
  const { refershToken, auth } = useAuth();

  useLayoutEffect(() => {
    refershToken();
  }, []);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  if (auth.loading) return <div>Loading...</div>;

  return <>{<Outlet />}</>;
}

export default PersistentLogin;
