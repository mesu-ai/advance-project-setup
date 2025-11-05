import { store } from '@/store/store';
import { redirect } from 'react-router';
import { authApi } from '@/store/api/endpoints/authEndpoints';

export async function authMiddleware({ request }: { request: Request }) {
  const url = new URL(request.url);
  const { pathname, search } = url;
  const callbackUrl = pathname + search;

  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot'];
  const isPublic = publicRoutes.some((p) => pathname.startsWith(p));

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

  const hasAuth = isAuthenticated || user !== null;

  console.log({ isAuthenticated, hasUser: !!user, hasAuth });

  if (!isPublic && !hasAuth) {
    console.log('Not authenticated and no user - redirect to login');
    throw redirect(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  if (isPublic && isAuthenticated) {
    console.log('Already authenticated - redirect to home');
    throw redirect('/');
  }

  return null;
}
