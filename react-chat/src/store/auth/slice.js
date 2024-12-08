import { createSlice } from '@reduxjs/toolkit';
import { decodeJwt } from 'jose';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '',
    refreshToken: '',
    exp: null,
  },
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);

      try {
        const decodedToken = decodeJwt(action.payload.accessToken);
        state.exp = decodedToken.exp;
        localStorage.setItem('exp', decodedToken.exp);
      } catch (error) {
        console.error('Failed to decode JWT', error);
        state.exp = null;
      }
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.exp = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('exp');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;

export default authSlice.reducer;
