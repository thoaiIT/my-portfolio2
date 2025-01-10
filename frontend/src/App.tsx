import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import { LazyLoginPage, LazyPortfolioPage } from './lib/lazyComponents';
import Loading from './components/Loading';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ApolloProvider client={client}>
        <Routes>
          {/* Portfolio không yêu cầu đăng nhập */}
          <Route path="/" element={<LazyPortfolioPage />} />

          {/* Trang đăng nhập */}
          <Route path="/login" element={<LazyLoginPage />} />

          {/* Admin Dashboard yêu cầu đăng nhập */}
          <Route path="/admin" element={<PrivateRoute />}>
            <Route index element={<div>Admin Dashboard</div>} />
            <Route path="project" element={<div>Project</div>} />
            <Route path="skill" element={<div>Skill</div>} />
          </Route>
        </Routes>
      </ApolloProvider>
    </Suspense>
  );
};

export default App;
