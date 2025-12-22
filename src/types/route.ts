import type { ComponentType, LazyExoticComponent, ReactNode, SVGProps } from 'react';

export interface AppRouteProps {
  index?: boolean;
  path?: string;
  Component?: LazyExoticComponent<ComponentType<unknown>> | (() => ReactNode);
  layout?: LazyExoticComponent<ComponentType<unknown>> | (() => ReactNode);
  middleware?: [];
  children?: AppRouteProps[];
}

export interface SideRouteProps {
  title: string;
  path: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  children?: SideRouteProps[];
}
