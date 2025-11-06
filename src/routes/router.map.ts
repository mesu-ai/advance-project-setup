export const routerPermissionMap: Record<string, string> = {
  // dashboard
  '/': 'dashboard',

  // order
  '/orders': 'orders.index',

  // products
  '/products': 'products',
  '/products/create': 'products.create',
  '/products/pending': 'products.pending',
  '/products/approved': 'products.approved',
  '/products/low-stock': 'products.low-stock',
  '/products/rejected': 'products.rejected',
};
