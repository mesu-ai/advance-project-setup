// import { redirect } from 'react-router';
import type { User } from '../types/types';
import { getSession } from '../sessions.server';

export async function authMiddleware({ request }: { request: Request }) {
  const url = new URL(request.url);
  const { pathname, search } = url;
  const callbackUrl = pathname + search;
  // const isHomePage = callbackUrl === '/';

  console.log({ pathname, url, callbackUrl });

  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot'];
  const isPublic = publicRoutes.some((p) => pathname.startsWith(p));

  const session = await getSession(request.headers.get('Cookie'));

  console.log('🔍 Cookie from request:', request.headers.get('Cookie'));
  console.log('👤 User from session:', session.get('user'));

  const user: User = session.get('user');

  console.log({ session, user });

  if (!isPublic && !user) {
    console.log('private and no user');
    // throw redirect(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  if (isPublic && user) {
    console.log('public and user');
    // throw redirect('/');
  }
  return null;

  // try {
  //   const userData = localStorage?.getItem('user');
  //   const userParseData: User = userData ? JSON.parse(userData) : null;
  //   const isAuthenticated = !isEmpty(userParseData) && !!userParseData.name;

  //   console.log({ isPublic, isAuthenticated });

  //   if (!isPublic && !isAuthenticated) {
  //     console.log('private and no token', search);
  //     if(isHomePage) throw redirect('/auth/login')
  //     throw redirect(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  //   }

  //   if (isPublic && isAuthenticated) {
  //     console.log('public but token has');
  //     throw redirect('/');
  //   }
  //   return null;
  // } catch (error) {
  //   console.error('Error parsing user data:', error);
  //   if (isHomePage) throw redirect('/auth/login');
  //   throw redirect(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  // }
}
