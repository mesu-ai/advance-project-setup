interface RoutePermissionT {
  page: string;
  actions?: string[];
}

export const routerPermissionMap: Record<string, RoutePermissionT> = {
  '/': { page: 'dashboard.index', actions: ['view', 'delete'] },

  '/orders': { page: 'orders.index' },

  '/products': { page: 'products.index' },
  '/products/create': { page: 'products.create', actions: ['create'] },
  '/products/pending': { page: 'products.pending', actions: ['update', 'delete'] },
  '/products/approved': { page: 'products.approved', actions: ['update', 'delete'] },
  '/products/low-stock': { page: 'products.low-stock', actions: ['update', 'delete'] },
  '/products/rejected': { page: 'products.rejected', actions: ['update', 'delete'] },
};
