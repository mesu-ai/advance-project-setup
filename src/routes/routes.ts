//app.routes.ts:
import type { AppRouteProps } from '@/types';
import { lazy } from 'react';

const Home = lazy(() => import('../pages/home/index'));
const Contact = lazy(() => import('../pages/contact/index'));

const Products = lazy(() => import('../pages/products/index'));
const CreateProduct = lazy(() => import('../pages/products/create/CreateProductPage'));
const PendingProduct = lazy(() => import('../pages/products/pending/PendingProductPage'));
const ApprovedProduct = lazy(() => import('../pages/products/approved/ApprovedProductPage'));
const RejectedProduct = lazy(() => import('../pages/products/rejected/RejectedProductPage'));
const LowStockProduct = lazy(() => import('../pages/products/low-stock/LowStockProductPage'));

const Orders = lazy(() => import('../pages/orders/index'));

const AccessControl = lazy(() => import('../pages/access-control/index'));
const EmployeeList = lazy(() => import('../pages/access-control/employee-list/index'));
const RolePermission = lazy(() => import('../pages/access-control/roles-permissions/index'));
const CreateRole = lazy(() => import('../pages/access-control/roles-permissions/create/index'));
const EditRole = lazy(() => import('../pages/access-control/roles-permissions/edit/index'));

const Login = lazy(() => import('../pages/login/index'));
const Register = lazy(() => import('../pages/register/index'));
const Forgot = lazy(() => import('../pages/forgot/index'));
const AssessDenied = lazy(() => import('../pages/403/index'));

export const publicRoutes = ['/auth/403', '/auth/login', '/auth/register', '/auth/forgot'];

// AuthLayout Routes
export const authRoutes: AppRouteProps[] = [
  {
    children: [
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'forgot', Component: Forgot },
    ],
  },
];

// RootLayout Routes
export const appRoutes: AppRouteProps[] = [
  //public
  {
    path: 'auth',
    children: [{ path: '403', Component: AssessDenied }],
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
  {
    path: 'orders',
    children: [
      { index: true, Component: Orders },
      { path: 'new', Component: CreateProduct },
      { path: 'pending', Component: PendingProduct },
      { path: 'approved', Component: ApprovedProduct },
      { path: 'return', Component: RejectedProduct },
      { path: 'cancel', Component: LowStockProduct },
    ],
  },
  {
    path: 'access-control',
    children: [
      { index: true, Component: AccessControl },
      { path: 'employee-list', Component: EmployeeList },
      {
        path: 'roles-permissions',
        children: [
          { index: true, Component: RolePermission },
          { path: 'create', Component: CreateRole },
          { path: ':roleId/edit', Component: EditRole },
        ],
      },
    ],
  },
];
