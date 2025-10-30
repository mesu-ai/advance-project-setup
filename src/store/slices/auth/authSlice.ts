import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserT } from '../../../types';

interface UserAuthSliceT {
  user: UserT | null;
  isAuthenticated: boolean;
}

const initialState: UserAuthSliceT = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAuth: (state, action: PayloadAction<UserT>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      //clear localStorage on logout
      localStorage.removeItem('user');
    },
  },
});

export const { loginAuth, logoutAuth } = authSlice.actions;
export default authSlice.reducer;
