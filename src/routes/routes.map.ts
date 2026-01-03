import type { RoutePermissionMapT } from '@/types';

const productRoutePermissions: RoutePermissionMapT = {
  '/products': { page: 'products.index', showInTable: false },
  '/products/create': { page: 'products.create', actions: ['edit', 'view'] },
  '/products/pending': { page: 'products.pending', actions: ['update', 'delete'] },
  '/products/approved': { page: 'products.approved', actions: ['update', 'delete'] },
  '/products/low-stock': { page: 'products.low-stock', actions: ['update', 'delete'] },
  '/products/rejected': { page: 'products.rejected', actions: ['update', 'delete'] },
} as const;

const orderRoutePermissions: RoutePermissionMapT = {
  '/orders': { page: 'orders.index' },
} as const;

const accessRoutePermissions: RoutePermissionMapT = {
  '/access-control': { page: 'access-control.index', showInTable: false },
  '/access-control/employees': {
    page: 'access-control.employees',
    actions: ['create', 'update', 'delete'],
  },
  '/access-control/employees/create': {
    page: 'access-control.employees.create',
    actions: ['create', 'update', 'delete'],
  },
  '/access-control/employees/:employeeId/edit': {
    page: 'access-control.employees.edit',
    actions: ['create', 'update', 'delete'],
  },
  '/access-control/roles': {
    page: 'access-control.roles',
    actions: ['create', 'update', 'delete'],
  },
  '/access-control/roles/create': {
    page: 'access-control.roles.create',
    actions: ['create', 'update', 'delete'],
  },
  '/access-control/roles/:roleId/edit': {
    page: 'access-control.roles.edit',
    actions: ['create', 'update', 'delete'],
  },
} as const;

export const routerPermissionMap: RoutePermissionMapT = Object.freeze({
  '/': { page: 'dashboard.index', actions: ['view', 'delete'] },
  ...productRoutePermissions,
  ...orderRoutePermissions,
  ...accessRoutePermissions,
});

export { productRoutePermissions, orderRoutePermissions, accessRoutePermissions };
