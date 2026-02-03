import { baseApi } from '../baseApi';

export const shopApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getShops: build.query({
      query: (params) => ({
        url: '/shops',
        params,
      }),
      providesTags: ['Shop'],
    }),
  }),
});

export const { useGetShopsQuery } = shopApi;
