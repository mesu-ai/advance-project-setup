import type { ComponentType, LazyExoticComponent, ReactNode } from 'react';

export interface AppRouteProps {
  index?: boolean;
  path?: string;
  Component?: LazyExoticComponent<ComponentType<unknown>> | (() => ReactNode);
  layout?: LazyExoticComponent<ComponentType<unknown>> | (() => ReactNode);
  middleware?: [];
  children?: AppRouteProps[];
  // action?: ActionFunction;
  // loader?: LoaderFunction;
}

export interface SideRouteProps {
  title: string;
  path: string;
  icon?: ReactNode;
  children?: SideRouteProps[];
}
