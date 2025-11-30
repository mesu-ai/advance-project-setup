//sidebar.routes.ts

import type { SideRouteProps } from '@/types';
import ProductIcon from '@/assets/svg/ProductIcon';
import OrderIcon from '@/assets/svg/OrderIcon';
import DashboardIcon from '@/assets/svg/DashboardIcon';

export const sidebarRoutes: SideRouteProps[] = [
  { title: 'Dashboard', path: '/', icon: DashboardIcon },
  {
    title: 'Products',
    path: 'products',
    icon: ProductIcon,
    children: [
      { title: 'Create Product', path: 'create' },
      { title: 'Pending Product', path: 'pending' },
      { title: 'Approved Product', path: 'approved' },
      { title: 'Rejected Product', path: 'rejected' },
      { title: 'Low Stock', path: 'low-stock' },
    ],
  },
  {
    title: 'Orders',
    path: 'orders',
    icon: OrderIcon,
    children: [
      { title: 'Create Product', path: 'create' },
      { title: 'Pending Product', path: 'pending' },
      { title: 'Approved Product', path: 'approved' },
      { title: 'Rejected Product', path: 'rejected' },
      { title: 'Low Stock', path: 'low-stock' },
    ],
  },
];
