import { Navigate } from 'react-router-dom';

interface RouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};