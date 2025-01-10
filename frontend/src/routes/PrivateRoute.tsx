import { LazyAdminLayout } from '@/lib/lazyComponents';
import useAuthStore from '@/store/auth.store';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <LazyAdminLayout>
      <Outlet />
    </LazyAdminLayout>
  );
};

export default PrivateRoute;
