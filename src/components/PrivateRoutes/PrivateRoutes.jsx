import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const adminToken = localStorage.getItem('adminToken');
  const location = useLocation();

  // If user is logged in and tries to access login page, redirect to dashboard
  if (adminToken && location.pathname === "/admin/admin-login") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Allow access to protected routes if logged in
  return adminToken ? <Outlet /> : <Navigate to="/admin/admin-login" replace />;
};

export default PrivateRoute;
