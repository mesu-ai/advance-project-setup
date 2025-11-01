import { store } from '@/store/store';
import { redirect } from 'react-router';

export async function authMiddleware({ request }: { request: Request }) {
  const url = new URL(request.url);
  const { pathname, search } = url;
  const callbackUrl = pathname + search;

  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot'];
  const isPublic = publicRoutes.some((p) => pathname.startsWith(p));

  const { isAuthenticated, user } = store.getState().auth;

  // ✅ Allow access if either:
  // 1. Has valid token (isAuthenticated = true)
  // 2. OR has user in state (will be refreshed by useAuthInit)
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
