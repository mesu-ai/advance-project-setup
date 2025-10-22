import { redirect } from 'react-router';

export async function authMiddleware({ request }: { request: Request }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  console.log({ pathname });

  const userData = localStorage?.getItem('user');
  const userParseData = userData && JSON.parse(userData);
  const isAuthenticated = userParseData?.name;

  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot'];
  const isPublic = publicRoutes.some((path) => pathname.startsWith(path));

  console.log({ isPublic, isAuthenticated });
  if (!isPublic && !isAuthenticated) {
    console.log('private and no token');
    throw redirect('/auth/login');
  }

  if (isPublic && isAuthenticated) {
    console.log('public but token has');
    throw redirect('/');
  }

  return null;
}
