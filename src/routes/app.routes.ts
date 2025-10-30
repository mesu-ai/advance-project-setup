//app.routes.ts:

import { lazy, type ComponentType, type LazyExoticComponent, type ReactNode } from 'react';
import type { ActionFunction, LoaderFunction } from 'react-router';
// import LoginPage, { loader as loginLoader, action as loginAction } from '../pages/login/index';
const Home = lazy(() => import('../pages/home/index'));
const Contact = lazy(() => import('../pages/contact/index'));
const Products = lazy(() => import('../pages/products/index'));
const CreateProduct = lazy(() => import('../pages/products/create/CreateProductPage'));
const PendingProduct = lazy(() => import('../pages/products/pending/PendingProductPage'));
const ApprovedProduct = lazy(() => import('../pages/products/approved/ApprovedProductPage'));
const RejectedProduct = lazy(() => import('../pages/products/rejected/RejectedProductPage'));
const LowStockProduct = lazy(() => import('../pages/products/low-stock/LowStockProductPage'));
const Login = lazy(() => import('../pages/login/index'));
const Register = lazy(() => import('../pages/register/index'));
const Forgot = lazy(() => import('../pages/forgot/index'));

export interface AppRouteProps {
  index?: boolean;
  path?: string;
  Component?: LazyExoticComponent<ComponentType<unknown>> | (() => ReactNode);
  layout?: LazyExoticComponent<ComponentType<unknown>> | (() => ReactNode);
  middleware?: [];
  children?: AppRouteProps[];
  action?: ActionFunction;
  loader?: LoaderFunction;
}

export const appRoutes: AppRouteProps[] = [
  //public
  {
    path: 'auth',
    children: [
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'forgot', Component: Forgot },
    ],
  },

  //protected route:
  { index: true, Component: Home },
  { path: 'contact', Component: Contact },
  {
    path: 'products',
    children: [
      { index: true, Component: Products },
      { path: 'create', Component: CreateProduct },
      { path: 'pending', Component: PendingProduct },
      { path: 'approved', Component: ApprovedProduct },
      { path: 'rejected', Component: RejectedProduct },
      { path: 'low-stock', Component: LowStockProduct },
    ],
  },
];
