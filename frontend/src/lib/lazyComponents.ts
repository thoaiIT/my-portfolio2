import React from 'react';

// Admin Layout và Pages
export const LazyAdminLayout = React.lazy(
  () => import('@/layout/admin/adminLayout')
);

export const LazyPortfolioLayout = React.lazy(
  () => import('@/layout/portfolio/portfolioLayout')
);

// Portfolio và Login
export const LazyHomePage = React.lazy(() => import('@/page/home'));
export const LazyWorkPage = React.lazy(() => import('@/page/work'));
export const LazyAboutPage = React.lazy(() => import('@/page/about'));
export const LazyContactPage = React.lazy(() => import('@/page/contact'));
export const LazyPortfolioSkillsPage = React.lazy(() => import('@/page/portfolio-skills'));
export const LazyLabPage = React.lazy(() => import('@/page/lab'));
export const LazyPortfolioPage = React.lazy(() => import('@/page/portfolio'));
export const LazyLoginPage = React.lazy(() => import('@/page/login'));
// Skills Page
export const LazySkillsPage = React.lazy(() => import('@/page/skills'));
