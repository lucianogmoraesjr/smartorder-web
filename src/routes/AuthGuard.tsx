import { Navigate, Outlet as Page } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

interface AuthGuardProps {
  isPrivate?: boolean;
}

export function AuthGuard({ isPrivate = false }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  return <Page />;
}
