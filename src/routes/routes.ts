//app.routes.ts:
import type { AppRouteProps } from '@/types';
import { lazy } from 'react';

const Home = lazy(() => import('../pages/home/index'));
const Contact = lazy(() => import('../pages/contact/index'));

// products
const Products = lazy(() => import('../pages/products/index'));
const CreateProduct = lazy(() => import('../pages/products/create'));
const PendingProduct = lazy(() => import('../pages/products/pending'));
const ApprovedProduct = lazy(() => import('../pages/products/approved'));
const RejectedProduct = lazy(() => import('../pages/products/rejected'));
const LowStockProduct = lazy(() => import('../pages/products/low-stock'));

const Orders = lazy(() => import('../pages/orders/index'));

// access control
const AccessControl = lazy(() => import('../pages/access-control/index'));
const EmployeeList = lazy(() => import('../pages/access-control/employees/index'));
const CreateEmployee = lazy(() => import('../pages/access-control/employees/create/index'));
const EditEmployee = lazy(() => import('../pages/access-control/employees/edit/index'));
const RolePermission = lazy(() => import('../pages/access-control/roles/index'));
const CreateRole = lazy(() => import('../pages/access-control/roles/create/'));
const EditRole = lazy(() => import('../pages/access-control/roles/edit/index'));

// auth
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
      {
        path: 'employees',
        children: [
          { index: true, Component: EmployeeList },
          { path: 'create', Component: CreateEmployee },
          { path: ':employeeId/edit', Component: EditEmployee },
        ],
      },
      {
        path: 'roles',
        children: [
          { index: true, Component: RolePermission },
          { path: 'create', Component: CreateRole },
          { path: ':roleId/edit', Component: EditRole },
        ],
      },
    ],
  },
];
