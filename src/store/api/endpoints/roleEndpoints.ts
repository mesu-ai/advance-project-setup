import { baseApi } from '../baseApi';

export const roleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRoles: build.query({
      query: () => ({
        url: '/roles',
        method: 'GET',
      }),
      providesTags: ['Roles'],
    }),
  }),
});

export const { useGetRolesQuery } = roleApi;
