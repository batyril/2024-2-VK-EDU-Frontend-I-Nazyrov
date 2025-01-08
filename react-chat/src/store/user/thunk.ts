import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateUserParams, userService } from '../../api/userService';
import axios from 'axios';

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async () => {
    const { getCurrentUser } = userService();
    return await getCurrentUser();
  },
);

export const fetchUserUpdate = createAsyncThunk(
  'user/fetchUserUpdate',
  async (body: UpdateUserParams, { rejectWithValue }) => {
    const { updateUser } = userService();
    try {
      return await updateUser(body);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error);
    }
  },
);
