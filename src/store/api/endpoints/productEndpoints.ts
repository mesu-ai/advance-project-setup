import { baseApi } from '../baseApi';

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
