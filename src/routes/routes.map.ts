interface RoutePermissionT {
  page: string;
  actions?: readonly string[];
}

const productRoutePermissions: Record<string, RoutePermissionT> = {
  '/products': { page: 'products.index' },
  '/products/create': { page: 'products.create', actions: ['edit', 'view'] },
  '/products/pending': { page: 'products.pending', actions: ['update', 'delete'] },
  '/products/approved': { page: 'products.approved', actions: ['update', 'delete'] },
  '/products/low-stock': { page: 'products.low-stock', actions: ['update', 'delete'] },
  '/products/rejected': { page: 'products.rejected', actions: ['update', 'delete'] },
} as const;

const orderRoutePermissions: Record<string, RoutePermissionT> = {
  '/orders': { page: 'orders.index' },
} as const;

const accessRoutePermissions: Record<string, RoutePermissionT> = {
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
} as const;

export const routerPermissionMap: Record<string, RoutePermissionT> = Object.freeze({
  '/': { page: 'dashboard.index', actions: ['view', 'delete'] },
  ...productRoutePermissions,
  ...orderRoutePermissions,
  ...accessRoutePermissions,
});

export { productRoutePermissions, orderRoutePermissions, accessRoutePermissions };
