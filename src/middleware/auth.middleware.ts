import { redirect } from 'react-router';
import { store } from '../store/store';

export async function authMiddleware({ request }: { request: Request }) {
  const url = new URL(request.url);
  const { pathname, search } = url;
  const callbackUrl = pathname + search;

  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot'];
  const isPublic = publicRoutes.some((p) => pathname.startsWith(p));

  const isAuthenticated = store.getState().auth.isAuthenticated; // check user valid or not
  console.log({ isAuthenticated });

  if (!isPublic && !isAuthenticated) {
    console.log('private and no user');
    throw redirect(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  if (isPublic && isAuthenticated) {
    console.log('public and user');
    throw redirect('/');
  }
  return null;
}
