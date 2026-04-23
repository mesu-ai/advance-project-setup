import type {
  ApiResponseT,
  CategoryDetailsT,
  CategoryParamsT,
  CategorySummaryT,
  CategoryTreeT,
} from '@/types';
import { baseApi } from '../baseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<ApiResponseT<CategorySummaryT[]>, CategoryParamsT>({
      query: (params) => ({
        url: '/categories',
        params,
      }),
      providesTags: ['Category'],
    }),

    getCategoryBySearch: build.query({
      query: (params) => ({
        url: '/categories/suggessions',
        params,
      }),
    }),

    getCateogryWithLayers: build.query({
      query: (categoryId) => `/categories/${categoryId}/with-layers`,
    }),

    getCategoryTree: build.query<ApiResponseT<CategoryTreeT[]>, void>({
      query: () => '/categories/tree',
      providesTags: ['Category'],
    }),

    getCategoryById: build.query<ApiResponseT<CategoryDetailsT>, string>({
      query: (categoryId) => `/categories/${categoryId}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryBySearchQuery,
  useGetCategoryTreeQuery,
  useGetCategoryByIdQuery,
} = categoryApi;
