import type { ApiResponseT, BrandParamsT, BrandT } from '@/types';
import { baseApi } from '../baseApi';

export const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query<ApiResponseT<BrandT[]>, BrandParamsT>({
      query: (params) => ({
        url: '/brands',
        params,
      }),
      providesTags: ['Brand'],
    }),
    getBrandById: build.query<ApiResponseT<BrandT>, string>({
      query: (brandId) => `/brands/${brandId}`,
    }),
  }),
});

export const { useGetBrandsQuery, useGetBrandByIdQuery } = brandApi;
