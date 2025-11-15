import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';
import { appRoutes, authRoutes } from './routes';
import type { RouteObject } from 'react-router';
import ErrorBoundary from '../components/feedback/ErrorBoundary';
import { authMiddleware } from '../middleware/auth.middleware';
import AuthLayout from '@/layout/AuthLayout';

const RootLayout = lazy(() => import('../layout/RootLayout'));
const NotFound = lazy(() => import('../pages/404/index'));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: ErrorBoundary,
    middleware: [authMiddleware],
    children: appRoutes as RouteObject[],
  },
  {
    path: '/auth',
    Component: AuthLayout,
    ErrorBoundary: ErrorBoundary,
    middleware: [authMiddleware],
    children: authRoutes as RouteObject[],
  },

  {
    Component: RootLayout,
    ErrorBoundary: ErrorBoundary,
    children: [{ path: '*', Component: NotFound }] as RouteObject[],
  },
]);
