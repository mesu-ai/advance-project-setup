import type { RoutePermissionMapT } from '@/types';

const productRoutePermissions: RoutePermissionMapT = {
  '/products': { page: 'products.index' },
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
  '/access-control': { page: 'access-control.index', actions: ['create', 'update', 'delete'] },
  '/access-control/employee-list': {
    page: 'access-control.employee-list',
    actions: ['create', 'update', 'delete'],
  },
  '/access-control/roles-permissions': {
    page: 'access-control.roles-permissions',
    actions: ['create', 'update', 'delete'],
  },
  '/access-control/roles-permissions/create': {
    page: 'access-control.roles-permissions.create',
    actions: ['create', 'update', 'delete'],
  },
  '/access-control/roles-permissions/:roleId/edit': {
    page: 'access-control.roles-permissions.edit',
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
