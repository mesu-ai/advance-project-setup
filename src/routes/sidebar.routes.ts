//sidebar.routes.ts
import ProductIcon from '@/assets/svg/ProductIcon';
import OrderIcon from '@/assets/svg/OrderIcon';
import DashboardIcon from '@/assets/svg/DashboardIcon';
import RoleIcon from '@/assets/svg/RoleIcon';
import type { SidebarRouteGroupT, SidebarRouteT } from '@/types';

export const sidebarGeneralRoutes: SidebarRouteT[] = [
  { title: 'Dashboard', path: '/', icon: DashboardIcon },
  {
    title: 'Products',
    path: 'products',
    icon: ProductIcon,
    children: [
      { title: 'Create Product', path: 'create' },
      { title: 'Manage Products', path: 'manage' },
    ],
  },
  {
    title: 'Orders',
    path: 'orders',
    icon: OrderIcon,
    children: [
      { title: 'Create Order', path: 'create' },
      { title: 'Cancel Order', path: 'cancel' },
      { title: 'Manage Orders', path: 'manage' },
    ],
  },
];

export const sidebarUserRoutes: SidebarRouteT[] = [
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

export const sidebarSettingsRoutes: SidebarRouteT[] = [
  { title: 'Sellers', path: 'settings/sellers', icon: DashboardIcon },
  { title: 'Brands', path: 'settings/brands', icon: DashboardIcon },
  { title: 'Categories', path: 'settings/categories', icon: ProductIcon },
];

export const sidebarRoutes: SidebarRouteGroupT[] = [
  { title: 'General', routes: sidebarGeneralRoutes },
  { title: 'Settings', routes: sidebarSettingsRoutes },
  { title: 'Users', routes: sidebarUserRoutes },
];
