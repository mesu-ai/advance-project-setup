import type { LoginRequestT, LoginResponseT, RefreshTokenResponseT } from '@/types';
import { baseApi } from '../baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponseT, LoginRequestT>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      invalidatesTags: ['Auth'],
    }),

    refreshToken: build.mutation<RefreshTokenResponseT, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
        credentials: 'include',
      }),
    }),

    logout: build.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation, useLogoutMutation } = authApi;
