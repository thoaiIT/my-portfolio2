import React from 'react';

// Admin Layout và Pages
export const LazyAdminLayout = React.lazy(
  () => import('@/layout/admin/adminLayout')
);

export const LazyPortfolioLayout = React.lazy(
  () => import('@/layout/portfolio/portfolioLayout')
);

// Portfolio và Login
export const LazyPortfolioPage = React.lazy(() => import('@/page/portfolio'));
export const LazyLoginPage = React.lazy(() => import('@/page/login'));
// Skills Page
export const LazySkillsPage = React.lazy(() => import('@/page/skills'));
export const LazySocialsPage = React.lazy(() => import('@/page/socials'));
