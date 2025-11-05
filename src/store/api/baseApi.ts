import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { loggedOut, tokenRefreshed } from '../slices/auth/authSlice';
import type { RefreshTokenResponseT } from '@/types';
import { decodeJwt } from '@/utils/decodeJwt';

type BaseQueryFnT = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

let isRefreshing = false;
// Share the in-flight refresh so concurrent callers can await the same network request
let refreshPromise: Promise<RefreshTokenResponseT | undefined> | null = null;

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

// Single-flight refresh helper used by all paths (401 fallback, proactive expiring, and direct refresh calls)
const ensureRefreshed = async (
  api: Parameters<BaseQueryFnT>[1],
  extraOptions: Parameters<BaseQueryFnT>[2]
): Promise<RefreshTokenResponseT | undefined> => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = (async () => {
      try {
        const refreshResult = await baseQuery(
          { url: '/auth/refresh', method: 'POST', credentials: 'include' },
          api,
          extraOptions
        );
        const data = refreshResult.data as RefreshTokenResponseT | undefined;
        const newAccessToken = data?.data?.accessToken;
        if (newAccessToken) {
          api.dispatch(tokenRefreshed(newAccessToken));
          return data;
        } else {
          api.dispatch(loggedOut());
          return undefined;
        }
      } finally {
        isRefreshing = false;
        // clear the promise so future refreshes can run
        const prev = refreshPromise;
        refreshPromise = null;
        void prev;
      }
    })();
  }
  return refreshPromise ? await refreshPromise : undefined;
};

const baseQueryWithReauth: BaseQueryFnT = async (args, api, extraOptions) => {
  const { accessToken: token } = (api.getState() as RootState).auth;
  const currTime = Math.floor(Date.now() / 1000);
  const isRefreshCall =
    typeof args === 'string'
      ? args.includes('/auth/refresh')
      : typeof (args as FetchArgs)?.url === 'string' &&
        (args as FetchArgs).url.includes('/auth/refresh');

  // If this is the refresh call itself, ensure single-flight and dispatch token update
  if (isRefreshCall) {
    const data = await ensureRefreshed(api, extraOptions);
    if (data) {
      return { data } as { data: unknown };
    }
    return { error: { status: 401, data: { message: 'Refresh failed' } } as FetchBaseQueryError };
  }

  // Note: reload preflight handled in auth.middleware to avoid duplication

  // proactive refresh (<5 min to expire)
  if (token) {
    const payload = decodeJwt<{ exp: number }>(token);

    if (payload && payload.exp - currTime < 300 && payload.exp > currTime) {
      console.log('⚠️ Token expiring soon, refreshing before request...');
      await ensureRefreshed(api, extraOptions);
    }
  }

  // main request
  let result = await baseQuery(args, api, extraOptions);

  // fallback refresh if 401
  if (result.error && result.error.status === 401) {
    await ensureRefreshed(api, extraOptions);
    const postToken = (api.getState() as RootState).auth.accessToken;
    if (postToken) {
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Products', 'Order', 'User', 'Category'], // ✅ More tag types
  endpoints: () => ({}),
});
