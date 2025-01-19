import { LazyPortfolioLayout } from '@/lib/lazyComponents';
import { Outlet } from 'react-router-dom';

const PublicRoute = () => {
  return (
    <LazyPortfolioLayout>
      <Outlet />
    </LazyPortfolioLayout>
  );
};

export default PublicRoute;
