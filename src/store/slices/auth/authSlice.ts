import type { UserT } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserAuthSliceT {
  user: UserT | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: UserAuthSliceT = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSucceeded: (state, action: PayloadAction<{ user: UserT; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },

    tokenRefreshed: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },

    loggedOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      //clear localStorage on logout
      localStorage.removeItem('user');
    },
  },
});

export const { loginSucceeded, tokenRefreshed, loggedOut } = authSlice.actions;
export default authSlice.reducer;
