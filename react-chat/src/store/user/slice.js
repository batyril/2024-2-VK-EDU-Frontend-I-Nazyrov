import { createSlice } from '@reduxjs/toolkit';
import REQUEST_STATUS from '../../const/request.js';
import { fetchUserInfo, fetchUserUpdate } from './thunk.js';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    details: null,
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCESS;
        state.details = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = REQUEST_STATUS.ERROR;
        state.error = action.error.message;
      })
      .addCase(fetchUserUpdate.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchUserUpdate.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCESS;
        state.details = action.payload;
      })
      .addCase(fetchUserUpdate.rejected, (state, action) => {
        state.status = REQUEST_STATUS.ERROR;
        state.error = action.error.message;
      })
      .addDefaultCase(() => {});
  },
});

export default userSlice.reducer;
