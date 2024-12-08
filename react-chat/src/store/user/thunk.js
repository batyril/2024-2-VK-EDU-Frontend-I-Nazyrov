import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../api/userService/index.js';

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async () => {
    const { getCurrentUser } = userService();
    return await getCurrentUser();
  },
);

export const fetchUserUpdate = createAsyncThunk(
  'user/fetchUserUpdate',
  async ({ ...body }, { rejectWithValue }) => {
    const { updateUser } = userService();
    try {
      return await updateUser({ ...body });
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  },
);
