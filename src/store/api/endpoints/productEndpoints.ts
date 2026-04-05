import type { ApiResponseT, ProductSummaryT, ProductT } from '@/types';
import { baseApi } from '../baseApi';

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ApiResponseT<ProductSummaryT[]>, void>({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    getProductById: build.query<ApiResponseT<ProductT>, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
