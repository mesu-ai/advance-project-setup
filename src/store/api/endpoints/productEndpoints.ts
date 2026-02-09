import type { ApiResponseT, ProductT } from '@/types';
import { baseApi } from '../baseApi';

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ApiResponseT<ProductT[]>, void>({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
