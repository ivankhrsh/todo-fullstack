import React, { FC, ReactElement } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../auth/hooks/checkAuth';
import { Loader } from '../../common/components/loader/Loader';

interface ProtectedRouteProps {
  element: ReactElement;
  redirectTo: string;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ element, redirectTo }) => {
  const { isUserLogin, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return isUserLogin ? element : <Navigate to={redirectTo} />;
};

export const RedirectRoute: FC<ProtectedRouteProps> = ({ element, redirectTo }) => {
  const { isUserLogin, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return !isUserLogin ? element : <Navigate to={redirectTo} />;
};
