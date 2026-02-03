import { baseApi } from '../baseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => '/categories',
      providesTags: ['Category'],
    }),

    getCategoryBySearch: build.query({
      query: (params) => ({
        url: '/categories/suggessions',
        params,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryBySearchQuery } = categoryApi;
