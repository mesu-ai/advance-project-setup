//sidebar.routes.ts

import type { SideRouteProps } from '@/types';

export const sidebarRoutes: SideRouteProps[] = [
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'contact', path: '/contact' },
  {
    title: 'Products',
    path: 'products',
    children: [
      { title: 'Create-Product', path: 'create' },
      { title: 'Pending-Product', path: 'pending' },
      { title: 'Approved-Product', path: 'approved' },
      { title: 'Rejected-Product', path: 'rejected' },
      { title: 'Low-Stock', path: 'low-stock' },
    ],
  },
  {
    title: 'Orders',
    path: 'orders',
    children: [
      { title: 'Create-Product', path: 'create' },
      { title: 'Pending-Product', path: 'pending' },
      { title: 'Approved-Product', path: 'approved' },
      { title: 'Rejected-Product', path: 'rejected' },
      { title: 'Low-Stock', path: 'low-stock' },
    ],
  },
];
