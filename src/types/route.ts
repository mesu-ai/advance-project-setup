import type { ComponentType, LazyExoticComponent, ReactNode, SVGProps } from 'react';

export interface AppRouteT {
  index?: boolean;
  path?: string;
  Component?: LazyExoticComponent<ComponentType<unknown>> | (() => ReactNode);
  layout?: LazyExoticComponent<ComponentType<unknown>> | (() => ReactNode);
  middleware?: [];
  children?: AppRouteT[];
}

export interface SidebarRouteT {
  title: string;
  path: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  children?: SidebarRouteT[];
}

export interface SidebarRouteGroupT {
  title: string;
  routes: SidebarRouteT[];
}

export interface RoutePermissionT {
  page: string;
  actions?: readonly string[];
  pageLabel?: string;
  showInTable?: boolean;
}

export type RoutePermissionMapT = Record<string, RoutePermissionT>;
