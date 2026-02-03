import type { EmployeeResponseT } from '@/types';
import { baseApi } from '../baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query({
      query: () => '/users',
      providesTags: ['Employee'],
    }),
    getEmployeeById: build.query<EmployeeResponseT, string>({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useGetEmployeesQuery, useGetEmployeeByIdQuery } = userApi;
