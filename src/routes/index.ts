import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';
import { appRoutes } from './app.routes';
import type { RouteObject } from 'react-router';
import ErrorBoundary from '../components/feedback/ErrorBoundary';
import { authMiddleware } from '../middleware/auth.middleware';

const RootLayout = lazy(() => import('../layout/RootLayout'));
// const ErrorBoundary = lazy(() => import('../components/feedback/ErrorBoundary'));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: ErrorBoundary,
    middleware: [authMiddleware],
    children: appRoutes as RouteObject[],
  },
]);
