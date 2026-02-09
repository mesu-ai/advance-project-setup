import type { ApiResponseT, ShopParamsT, ShopT } from '@/types';
import { baseApi } from '../baseApi';

export const shopApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getShops: build.query<ApiResponseT<ShopT[]>, ShopParamsT>({
      query: (params) => ({
        url: '/shops',
        params,
      }),
      providesTags: ['Shop'],
    }),
  }),
});

export const { useGetShopsQuery } = shopApi;
