import type { ApiResponseT, RealTimeStockT } from '@/types';
import { baseApi } from '../baseApi';

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getInventoryStock: build.mutation<ApiResponseT<RealTimeStockT>, { sellerProductSku: string }>({
      query: (params) => ({
        // url: 'inventory/getRealTimeStock',
        url: 'inventory',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useGetInventoryStockMutation } = inventoryApi;
