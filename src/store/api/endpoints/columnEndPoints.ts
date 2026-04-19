import type { ApiResponseT, ColumnSetting } from '@/types';
import { baseApi } from '../baseApi';

export const columnApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getColumns: build.query<ApiResponseT<ColumnSetting[]>, { type: string }>({
      query: (params) => ({
        url: '/columns',
        method: 'GET',
        params,
      }),
      providesTags: ['Column'],
    }),
  }),
});

export const { useGetColumnsQuery } = columnApi;
