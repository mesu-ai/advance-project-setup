import { store } from '@/store/store';
import { redirect } from 'react-router';
import { authApi } from '@/store/api/endpoints/authEndpoints';
import { routerPermissionMap } from '@/routes/routes.map';
import { normalizePath } from '@/utils/normalizePath';
import { publicRoutes } from '@/routes/routes';

export async function authMiddleware({ request }: { request: Request }) {
  const url = new URL(request.url);
  const { pathname, search } = url;
  const callbackUrl = pathname + search;

  const isPublic = publicRoutes.some((p) => pathname.startsWith(p));
  const normalizedPath = normalizePath(pathname);
  const pagePermission = routerPermissionMap[normalizedPath]?.page;

  const state = store.getState().auth;
  const { user } = state;
  let { isAuthenticated, accessToken } = state;

  if (!isPublic && user && !accessToken) {
    try {
      await store.dispatch(authApi.endpoints.refreshToken.initiate()).unwrap();
      // re-read and update
      ({ isAuthenticated, accessToken } = store.getState().auth);
    } catch {
      // baseApi handles logout on failure
    }
  }

  if (!isPublic && !isAuthenticated) {
    // console.log('Not authenticated and no user - redirect to login');
    throw redirect(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  if (!isPublic && isAuthenticated && !user?.permissions.includes(pagePermission)) {
    // console.log('page permission', !user?.permissions.includes(pagePermission));
    throw redirect('/auth/403');
  }

  return null;
}
