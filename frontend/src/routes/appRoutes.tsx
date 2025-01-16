import {
  LazyLoginPage,
  LazyPortfolioPage,
  LazySkillsPage,
} from '@/lib/lazyComponents';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import { paths } from './paths';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Portfolio không yêu cầu đăng nhập */}
      <Route path={paths.index} element={<LazyPortfolioPage />} />

      {/* Trang đăng nhập */}
      <Route path={paths.admin.login} element={<LazyLoginPage />} />

      {/* Admin Dashboard yêu cầu đăng nhập */}
      <Route path={paths.admin.index} element={<PrivateRoute />}>
        <Route
          index
          element={<Navigate to={paths.admin.dashboard} replace />}
        />
        <Route path={paths.admin.dashboard} element={<div>Dashboard</div>} />
        <Route path={paths.admin.projects} element={<div>Project</div>} />
        <Route path={paths.admin.skills} element={<LazySkillsPage />} />
        <Route path={paths.admin.socials} element={<div>Skill</div>} />
        <Route path={paths.admin.about} element={<div>Skill</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
