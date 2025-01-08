import { createSlice } from '@reduxjs/toolkit';
import { decodeJwt } from 'jose';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  exp?: null | string;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  exp: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);

      try {
        const decodedToken = decodeJwt(action.payload.accessToken);
        state.exp = decodedToken.exp ? decodedToken.exp.toString() : null;
        localStorage.setItem('exp', state.exp || '');
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
