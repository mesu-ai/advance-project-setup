import type { RoutePermissionMapT } from '@/types';

const productRoutePermissions: RoutePermissionMapT = {
  '/products': { page: 'products.index', showInTable: false },
  '/products/create': { page: 'products.create', pageLabel: 'Product Create' },
  '/products/:productId/edit': { page: 'products.edit', pageLabel: 'Product Edit' },
  '/products/:productId/duplicate': { page: 'products.duplicate', pageLabel: 'Product Duplicate' },
  '/products/manage': {
    page: 'products.manage',
    actions: ['edit', 'view'],
    pageLabel: 'Product Manage',
  },
} as const;

const orderRoutePermissions: RoutePermissionMapT = {
  '/orders': { page: 'orders.index', showInTable: false },
  '/orders/create': { page: 'orders.create', pageLabel: 'Order Create' },
  '/orders/manage': { page: 'orders.manage', pageLabel: 'Order Manage' },
  '/orders/cancel': { page: 'orders.cancel', pageLabel: 'Order Cancel' },
} as const;

const settingsRoutePermissions: RoutePermissionMapT = {
  '/settings/sellers': { page: 'sellers.index', pageLabel: 'Seller Settings' },
  '/settings/sellers/create': { page: 'sellers.create', pageLabel: 'Seller Create' },
  '/settings/sellers/:sellerId/edit': { page: 'sellers.edit', pageLabel: 'Seller Edit' },

  '/settings/sellers/:sellerId/shops/:shopId/banks': {
    page: 'sellers.banks',
    pageLabel: 'Seller Banks',
  },

  '/settings/categories': { page: 'categories.index', pageLabel: 'Category Settings' },
  '/settings/categories/create': { page: 'categories.create', pageLabel: 'Category Create' },
  '/settings/categories/:categoryId/edit': { page: 'categories.edit', pageLabel: 'Category Edit' },

  '/settings/brands': { page: 'brands.index', pageLabel: 'Brand Settings' },
  '/settings/brands/create': { page: 'brands.create', pageLabel: 'Brand Create' },
  '/settings/brands/:brandId/edit': { page: 'brands.edit', pageLabel: 'Brand Edit' },
} as const;

const accessRoutePermissions: RoutePermissionMapT = {
  '/access-control': { page: 'access-control.index', showInTable: false },
  '/access-control/employees': {
    page: 'access-control.employees',
    actions: ['view'],
    pageLabel: 'Employee List',
  },
  '/access-control/employees/create': {
    page: 'access-control.employees.create',
    pageLabel: 'Employee Create',
  },
  '/access-control/employees/:employeeId/edit': {
    page: 'access-control.employees.edit',
    pageLabel: 'Employee Edit',
  },
  '/access-control/roles': {
    page: 'access-control.roles',
    pageLabel: 'Role List',
  },
  '/access-control/roles/create': {
    page: 'access-control.roles.create',
    pageLabel: 'Role Create',
  },
  '/access-control/roles/:roleId/edit': {
    page: 'access-control.roles.edit',
    pageLabel: 'Role Edit',
  },
} as const;

export const routerPermissionMap: RoutePermissionMapT = Object.freeze({
  '/': { page: 'dashboard.index', actions: ['view', 'delete'] },
  ...productRoutePermissions,
  ...orderRoutePermissions,
  ...settingsRoutePermissions,
  ...accessRoutePermissions,
});

export {
  productRoutePermissions,
  orderRoutePermissions,
  settingsRoutePermissions,
  accessRoutePermissions,
};
