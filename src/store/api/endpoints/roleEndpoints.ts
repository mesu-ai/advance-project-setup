import type { RoleResponseT } from '@/types';
import { baseApi } from '../baseApi';

export const roleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRoles: build.query({
      query: () => ({
        url: '/roles',
        method: 'GET',
      }),
      providesTags: ['Role'],
    }),
    getRoleById: build.query<RoleResponseT, string>({
      query: (id) => ({
        url: `roles/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetRolesQuery, useGetRoleByIdQuery } = roleApi;
