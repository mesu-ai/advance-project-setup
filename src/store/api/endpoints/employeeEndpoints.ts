import { baseApi } from '../baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query({
      query: () => '/users',
      providesTags: ['Employees'],
    }),
  }),
});

export const { useGetEmployeesQuery } = userApi;
