import type {
  ApiResponseT,
  BankParamsT,
  BankT,
  SellerParamsT,
  SellerSummaryT,
  SellerT,
} from '@/types';
import { baseApi } from '../baseApi';

export const sellerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSellers: build.query<ApiResponseT<SellerSummaryT[]>, SellerParamsT>({
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

    getSellerBanks: build.query<ApiResponseT<BankT[]>, BankParamsT>({
      query: (params) => ({
        url: 'sellers/shops/banks',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useGetSellersQuery, useGetSellerByIdQuery, useGetSellerBanksQuery } = sellerApi;
