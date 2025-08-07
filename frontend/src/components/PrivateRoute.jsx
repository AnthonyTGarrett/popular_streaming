import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

/**
 * A React Component that checks the user context API to see if the user is logged in to access the route
 * @returns The rendered component.
 */
const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to='/login' />;
  return <Outlet />;
};

export default PrivateRoute;
