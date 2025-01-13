import React from 'react';

// Admin Layout và Pages
export const LazyAdminLayout = React.lazy(() => import('@/layout/adminLayout'));

// Portfolio và Login
export const LazyPortfolioPage = React.lazy(() => import('@/page/portfolio'));
export const LazyLoginPage = React.lazy(() => import('@/page/login'));
