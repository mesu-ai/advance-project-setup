import { routerPermissionMap } from '@/routes/router.map';
import { store } from '@/store/store';
import type { UserT } from '@/types';
import { normalizePath } from './normalizePath';

export const hasPermission = (user: UserT | null, key: string): boolean => {
  if (!user) return false;
  // if (user.role === 'admin') return true;
  return user.permissions.includes(key);
};

export const checkPageAction = (pathname: string, action: string) => {
  const normalizedPath = normalizePath(pathname);
  const routeInfo = routerPermissionMap[normalizedPath];
  if (!routeInfo || !routeInfo.actions) return false;

  const { user } = store.getState().auth;

  const pageKey = routeInfo.page;
  const actionKey = `${pageKey}.${action}`;
  return hasPermission(user, actionKey);
};
