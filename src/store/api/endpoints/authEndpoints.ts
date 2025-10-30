import type { LoginRequestT, LoginResponseT } from '../../../types';
import { baseApi } from '../baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponseT, LoginRequestT>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
