import type { ApiResponseT, RoleT } from '@/types';
import { baseApi } from '../baseApi';

export const roleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRoles: build.query<ApiResponseT<RoleT[]>, void>({
      query: () => ({
        url: '/roles',
        method: 'GET',
      }),
      providesTags: ['Role'],
    }),
    getRoleById: build.query<ApiResponseT<RoleT>, string>({
      query: (id) => ({
        url: `roles/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetRolesQuery, useGetRoleByIdQuery } = roleApi;
