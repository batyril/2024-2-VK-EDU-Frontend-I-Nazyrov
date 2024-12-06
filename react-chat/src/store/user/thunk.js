import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../api/userService/index.js';

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async ({ accessToken }) => {
    const { getCurrentUser } = userService();
    return await getCurrentUser({ accessToken });
  },
);

export const fetchUserUpdate = createAsyncThunk(
  'user/fetchUserUpdate',
  async ({ ...body }, { rejectWithValue }) => {
    const { updateUser } = userService();
    try {
      return await updateUser({ ...body });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);
