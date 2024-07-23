import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userId: null,
  bearerToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.bearerToken = action.payload.bearerToken;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userId = null;
      state.bearerToken = null;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
