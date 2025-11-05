// import { useEffect, useState } from 'react';
// import { useRefreshTokenMutation } from '@/store/api/endpoints/authEndpoints';
// import { useAppDispatch, useAppSelector } from './useAuth';
// import { tokenRefreshed, loggedOut } from '@/store/slices/auth/authSlice';

// export const useAuthInit = () => {
//   const [isInitialized, setIsInitialized] = useState(false);

//   const [refreshToken, { isLoading }] = useRefreshTokenMutation();
//   const dispatch = useAppDispatch();
//   const { user, accessToken } = useAppSelector((state) => state.auth);

//   useEffect(() => {
//     console.log('hit the token');

//     // If user exists but no token → refresh it
//     if (user && !accessToken) {
//       refreshToken()
//         .unwrap()
//         .then((res) => dispatch(tokenRefreshed(res.data.accessToken)))
//         .catch(() => dispatch(loggedOut()))
//         .finally(() => setIsInitialized(true));
//     } else {
//       setIsInitialized(true);
//     }
//   }, [user, accessToken, refreshToken, dispatch]);

//   return { isInitialized, isLoading };
// };

// hooks/useAuthInit.tsx
import { useEffect, useState } from 'react';
import { useAppSelector } from './useAuth';

export const useAuthInit = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { user, accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Rely on baseQueryWithReauth to refresh tokens centrally; just mark init complete.
    setIsInitialized(true);
  }, [user, accessToken]);

  return { isInitialized, isLoading: false };
};
