import type { ApiResponseT, CategoryT } from '@/types';
import { baseApi } from '../baseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<ApiResponseT<CategoryT[]>, void>({
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
