import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { loggedOut, tokenRefreshed } from '../slices/auth/authSlice';

type BaseQueryFnT = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

// ✅ Define refresh token response type
interface RefreshTokenResponse {
  success: boolean;
  data: {
    accessToken: string;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFnT = async (args, api, extraOptions) => {
  // Try the original request
  let result = await baseQuery(args, api, extraOptions);

  // If 401 Unauthorized, attempt token refresh
  if (result.error && result.error.status === 401) {
    console.log('Access token expired, attempting refresh...');

    // Call refresh token endpoint
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        credentials: 'include',
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // ✅ Extract access token from response
      const response = refreshResult.data as RefreshTokenResponse;
      const newAccessToken = response.data?.accessToken;

      if (newAccessToken) {
        console.log('Token refreshed successfully');

        // Store the new token in Redux
        api.dispatch(tokenRefreshed(newAccessToken));

        // Retry the original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error('Invalid refresh response structure');
        api.dispatch(loggedOut());
      }
    } else {
      console.warn('Refresh token expired or invalid, logging out...');
      api.dispatch(loggedOut());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Product', 'Order', 'User', 'Category'], // ✅ More tag types
  endpoints: () => ({}),
});
