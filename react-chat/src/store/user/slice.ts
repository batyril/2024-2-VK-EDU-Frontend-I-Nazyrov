import { createSlice } from '@reduxjs/toolkit';
import REQUEST_STATUS from '../../const/request.ts';
import { fetchUserInfo, fetchUserUpdate } from './thunk.ts';

export interface UserIDetails {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: string;
  is_online: boolean;
  last_online_at: string;
}

interface FetchError {
  avatar?: string[];
  first_name?: string[];
  last_name?: string[];
  username?: string[];
  bio?: string[];
}

interface UserState {
  details: null | UserIDetails;
  status: null | string;
  error: null | FetchError;
}

const initialState: UserState = {
  details: null,
  status: null,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
        state.error = (action.error.message as FetchError) || null;
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
        state.error = (action.error.message as FetchError) || null;
      });
  },
});

export default userSlice.reducer;
