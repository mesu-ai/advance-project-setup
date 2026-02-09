import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { baseApi, baseApi2 } from './api/baseApi';
import authReducer, { loggedOut, loginSucceeded } from './slices/auth/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const authListener = createListenerMiddleware();

authListener.startListening({
  matcher: isAnyOf(loggedOut, loginSucceeded),
  effect: async (_action, { dispatch }) => {
    dispatch(baseApi.util.resetApiState());
  },
});

const preloadStorage = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return {
        auth: {
          user,
          accessToken: null,
          isAuthenticated: false,
        },
      };
    }
  } catch (error) {
    console.error('Failed to load auth from localStorage:', error);
    localStorage.removeItem('user');
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [baseApi2.reducerPath]: baseApi2.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authListener.middleware, baseApi.middleware, baseApi2.middleware),
  preloadedState: preloadStorage(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
