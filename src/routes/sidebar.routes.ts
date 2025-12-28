//sidebar.routes.ts

import type { SideRouteProps } from '@/types';
import ProductIcon from '@/assets/svg/ProductIcon';
import OrderIcon from '@/assets/svg/OrderIcon';
import DashboardIcon from '@/assets/svg/DashboardIcon';
import RoleIcon from '@/assets/svg/RoleIcon';

export const sidebarGenRoutes: SideRouteProps[] = [
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

export const sidebarUserRoutes: SideRouteProps[] = [
  {
    title: 'Access Control',
    path: 'access-control',
    icon: RoleIcon,
    children: [
      { title: 'Employee List', path: 'employees' },
      { title: 'Roles & Permissions', path: 'roles' },
    ],
  },
];
