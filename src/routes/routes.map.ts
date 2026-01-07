import type { RoutePermissionMapT } from '@/types';

const productRoutePermissions: RoutePermissionMapT = {
  '/products': { page: 'products.index', showInTable: false },
  '/products/create': { page: 'products.create', pageLabel: 'Product Create' },
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
  ...accessRoutePermissions,
});

export { productRoutePermissions, orderRoutePermissions, accessRoutePermissions };
