import { baseApi } from '../baseApi';

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
