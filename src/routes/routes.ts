//app.routes.ts:
import type { AppRouteT } from '@/types';
import { lazy } from 'react';

const Home = lazy(() => import('../pages/home/index'));
const Contact = lazy(() => import('../pages/contact/index'));

// products
const Products = lazy(() => import('../pages/products/index'));
const CreateProduct = lazy(() => import('../pages/products/create/index'));
const EditProduct = lazy(() => import('../pages/products/edit/index'));
const ManageProduct = lazy(() => import('../pages/products/manage/index'));

// order
const Orders = lazy(() => import('../pages/orders/index'));
const CreateOrder = lazy(() => import('../pages/orders/create/index'));
const ManageOrder = lazy(() => import('../pages/orders/manage/index'));
const CancelOrder = lazy(() => import('../pages/orders/cancel/index'));

// settings section
const SellerList = lazy(() => import('../pages/settings/sellers/index'));
const CreateSeller = lazy(() => import('../pages/settings/sellers/create/index'));
const EditSeller = lazy(() => import('../pages/settings/sellers/edit/index'));
const SellerBanks = lazy(() => import('../pages/settings/sellers/shops/banks/index'));
const SellerShops = lazy(() => import('../pages/settings/sellers/shops/index'));

const CategoryList = lazy(() => import('../pages/settings/categories/index'));
const CreateCategory = lazy(() => import('../pages/settings/categories/create/index'));
const EditCategory = lazy(() => import('../pages/settings/categories/edit/index'));

const BrandList = lazy(() => import('../pages/settings/brands/index'));
// const CreateBrand = lazy(() => import('../pages/settings/brands/create/index'));
// const EditBrand = lazy(() => import('../pages/settings/brands/edit/index'));

// access control
const AccessControl = lazy(() => import('../pages/access-control/index'));
const EmployeeList = lazy(() => import('../pages/access-control/employees/index'));
const CreateEmployee = lazy(() => import('../pages/access-control/employees/create/index'));
const EditEmployee = lazy(() => import('../pages/access-control/employees/edit/index'));
const RolePermission = lazy(() => import('../pages/access-control/roles/index'));
const CreateRole = lazy(() => import('../pages/access-control/roles/create/index'));
const EditRole = lazy(() => import('../pages/access-control/roles/edit/index'));

// auth
const Login = lazy(() => import('../pages/auth/login/index'));
const Register = lazy(() => import('../pages/auth/register/index'));
const Forgot = lazy(() => import('../pages/auth/forgot/index'));
const AccessDenied = lazy(() => import('../pages/auth/403/index'));

export const publicRoutes = ['/auth/403', '/auth/login', '/auth/register', '/auth/forgot'];

// AuthLayout Routes
export const authRoutes: AppRouteT[] = [
  {
    children: [
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'forgot', Component: Forgot },
      // { path: '403', Component: AccessDenied }
    ],
  },
];

// RootLayout Routes
export const appRoutes: AppRouteT[] = [
  //public
  {
    path: 'auth',
    children: [{ path: '403', Component: AccessDenied }],
  },

  //protected route:
  { index: true, Component: Home },
  { path: 'contact', Component: Contact },
  {
    path: 'products',
    children: [
      { index: true, Component: Products },
      { path: 'create', Component: CreateProduct },
      { path: ':productId/edit', Component: EditProduct },
      { path: 'manage', Component: ManageProduct },
    ],
  },
  {
    path: 'orders',
    children: [
      { index: true, Component: Orders },
      { path: 'create', Component: CreateOrder },
      { path: 'manage', Component: ManageOrder },
      { path: 'cancel', Component: CancelOrder },
    ],
  },

  // settings
  {
    path: 'settings',
    children: [
      {
        path: 'sellers',
        children: [
          { index: true, Component: SellerList },
          { path: 'create', Component: CreateSeller },
          { path: ':sellerId/edit', Component: EditSeller },
          {
            path: ':sellerId/shops',
            children: [
              { index: true, Component: SellerShops },
              { path: ':shopId/banks', Component: SellerBanks },
            ],
          },
        ],
      },
      {
        path: 'categories',
        children: [
          { index: true, Component: CategoryList },
          { path: 'create', Component: CreateCategory },
          { path: ':categoryId/edit', Component: EditCategory },
        ],
      },
      {
        path: 'brands',
        children: [
          { index: true, Component: BrandList },
          // { path: 'create', Component: CreateBrand },
          // { path: ':brandId/edit', Component: EditBrand },
        ],
      },
    ],
  },

  // access control
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
