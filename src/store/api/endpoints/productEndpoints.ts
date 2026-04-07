import type { ApiResponseT, ProductParamsT, ProductSummaryT, ProductT } from '@/types';
import { baseApi } from '../baseApi';

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ApiResponseT<ProductSummaryT[]>, ProductParamsT>({
      query: (params) => ({
        url: '/products',
        method: 'GET',
        params,
      }),
      providesTags: ['Product'],
    }),
    getProductById: build.query<ApiResponseT<ProductT>, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
