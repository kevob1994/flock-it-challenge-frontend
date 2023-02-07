import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

type PrivateRouteProps = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: PrivateRouteProps) => {
  const { user } = React.useContext(AuthContext);

  if (!user) return <Navigate replace to='/login' />;

  return children;
};
