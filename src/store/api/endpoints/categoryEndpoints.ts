import { baseApi } from '../baseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => '/categories',
      providesTags: ['Categories'],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
