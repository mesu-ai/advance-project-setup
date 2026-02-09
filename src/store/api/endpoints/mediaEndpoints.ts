import type { MediaFileT } from '@/types/media';
import { baseApi2 } from '../baseApi';
import type { ApiResponseT } from '@/types';

export const mediaApi = baseApi2.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<ApiResponseT<{ files: MediaFileT[] }>, FormData>({
      query: (formData) => ({
        url: '/Image/UploadImage',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = mediaApi;
