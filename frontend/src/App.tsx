import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import LoginPage from './page/Login';
import PortfolioPage from './page/Portfolio';
import AdminLayout from './layout/AdminLayout';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Portfolio không yêu cầu đăng nhập */}
      <Route path="/" element={<PortfolioPage />} />

      {/* Trang đăng nhập */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Dashboard yêu cầu đăng nhập */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="project" element={<div />} />
        <Route path="skill" element={<div />} />
      </Route>
    </Routes>
  );
};

export default App;
