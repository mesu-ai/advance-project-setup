import { useEffect, useState } from 'react';
import { useRefreshTokenMutation } from '@/store/api/endpoints/authEndpoints';
import { useAppDispatch, useAppSelector } from './useAuth';
import { tokenRefreshed, loggedOut } from '@/store/slices/auth/authSlice';

export const useAuthInit = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [refreshToken, { isLoading }] = useRefreshTokenMutation();
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log('hit the token');

    // If user exists but no token → refresh it
    if (user && !accessToken) {
      refreshToken()
        .unwrap()
        .then((res) => dispatch(tokenRefreshed(res.data.accessToken)))
        .catch(() => dispatch(loggedOut()))
        .finally(() => setIsInitialized(true));
    } else {
      setIsInitialized(true);
    }
  }, [user, accessToken, refreshToken, dispatch]);

  return { isInitialized, isLoading };
};
