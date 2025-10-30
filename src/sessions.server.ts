// import { createCookieSessionStorage } from 'react-router';

// type SessionData = {
//   userId: string;
// };

// type SessionFlashData = {
//   error: string;
// };
// <SessionData, SessionFlashData>
// const cookieSessionStorage = createCookieSessionStorage({
// a Cookie from `createCookie` or the CookieOptions to create one
// cookie: {
//   name: '__session',
//   domain: 'reactrouter.com',
//   httpOnly: true,
//   maxAge: 60,
//   path: '/',
//   sameSite: 'lax',
//   secrets: ['s3cret1'],
//   secure: true,
// },

//   cookie: {
//     name: '__session',
//     secrets: ['super-secret-key'], // ✅ REQUIRED for signing cookies
//     sameSite: 'lax',
//     path: '/',
//     secure: import.meta.env.MODE === 'production' ? true : false,
//     maxAge: 60 * 60 * 24 * 7, // 7 days
//   },
// });

// export const { getSession, commitSession, destroySession } = cookieSessionStorage;
