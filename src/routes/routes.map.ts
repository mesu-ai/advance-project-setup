interface RoutePermissionT {
  page: string;
  actions?: string[];
}

export const routerPermissionMap: Record<string, RoutePermissionT> = {
  '/': { page: 'dashboard.index', actions: ['view', 'delete'] },

  '/orders': { page: 'orders.index' },

  '/products': { page: 'products.index' },
  '/products/create': { page: 'products.create', actions: ['edit', 'view'] },
  '/products/pending': { page: 'products.pending', actions: ['update', 'delete'] },
  '/products/approved': { page: 'products.approved', actions: ['update', 'delete'] },
  '/products/low-stock': { page: 'products.low-stock', actions: ['update', 'delete'] },
  '/products/rejected': { page: 'products.rejected', actions: ['update', 'delete'] },

  '/access-control': { page: 'access-control.index', actions: ['create', 'update', 'delete'] },
  '/access-control/employee-list': {
    page: 'access-control.employee-list',
    actions: ['create', 'update', 'delete'],
  },
  '/access-control/roles-permissions': {
    page: 'access-control.roles-permissions',
    actions: ['create', 'update', 'delete'],
  },
};
