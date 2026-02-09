import type { ApiResponseT, EmployeeT } from '@/types';
import { baseApi } from '../baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query<ApiResponseT<EmployeeT[]>, void>({
      query: () => '/users',
      providesTags: ['Employee'],
    }),
    getEmployeeById: build.query<ApiResponseT<EmployeeT>, string>({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useGetEmployeesQuery, useGetEmployeeByIdQuery } = userApi;
