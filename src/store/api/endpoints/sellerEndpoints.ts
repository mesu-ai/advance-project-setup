import type { ApiResponseT, SellerParamsT, SellerT } from '@/types';
import { baseApi } from '../baseApi';

export const sellerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSellers: build.query<ApiResponseT<SellerT[]>, SellerParamsT>({
      query: (params) => ({
        url: '/sellers',
        method: 'GET',
        params,
      }),
      providesTags: ['Seller'],
    }),
    getSellerById: build.query<ApiResponseT<SellerT>, string>({
      query: (id) => ({
        url: `sellers/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetSellersQuery, useGetSellerByIdQuery } = sellerApi;
