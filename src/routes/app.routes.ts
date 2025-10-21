import { lazy, type ComponentType, type LazyExoticComponent, type ReactNode } from 'react';
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

export interface AppRouteProps {
  index?: boolean;
  path?: string;
  Component?: LazyExoticComponent<ComponentType<unknown>> | (() => ReactNode);
  layout?: LazyExoticComponent<ComponentType<unknown>> | (() => ReactNode);
  children?: AppRouteProps[];
}

export const appRoutes: AppRouteProps[] = [
  { index: true, Component: Home },
  { path: 'contact', Component: Contact },
  {
    path: 'auth',
    children: [
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
    ],
  },
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
