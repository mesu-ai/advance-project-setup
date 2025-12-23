import { routerPermissionMap } from '@/routes/routes.map';
import { store } from '@/store/store';
import type { RoutePermissionT, UserT } from '@/types';
import { normalizePath } from './normalizePath';

const staticRoutes = new Map<string, RoutePermissionT>();
const dynamicRoutes: Array<{ permission: RoutePermissionT; regex: RegExp }> = [];

const pathToRegex = (path: string): RegExp =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '[^\\/]+') + '$');

const initializeRouteMaps = () => {
  if (staticRoutes.size > 0) return;
  for (const [path, permission] of Object.entries(routerPermissionMap)) {
    if (path.includes(':')) {
      dynamicRoutes.push({
        regex: pathToRegex(path),
        permission,
      });
    } else {
      staticRoutes.set(path, permission);
    }
  }

  // most specific first
  dynamicRoutes.sort((a, b) => b.regex.source.length - a.regex.source.length);
};

export const routePermission = (pathname: string): RoutePermissionT | null => {
  initializeRouteMaps();

  const staticPerm = staticRoutes.get(pathname);
  if (staticPerm) return staticPerm;

  for (const { permission, regex } of dynamicRoutes) {
    if (regex.test(pathname)) return permission;
  }
  return null;
};

export const hasPermission = (user: UserT | null, key: string): boolean => {
  if (!user) return false;
  // if (user.role === 'admin') return true;
  return user.permissions.includes(key);
};

export const checkPageAction = (pathname: string, actionName: string) => {
  const normalizedPath = normalizePath(pathname);
  const routeInfo = routePermission(normalizedPath);
  // const routeInfo = routerPermissionMap[normalizedPath];
  if (!routeInfo || !routeInfo.actions) return false;

  const { user } = store.getState().auth;

  const pageKey = routeInfo.page;
  const actionKey = `${pageKey}.${actionName}.action`;
  return hasPermission(user, actionKey);
};
