import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../api/userService/index.js';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async ({ page, page_size, search, accessToken }) => {
    const { getAllUsers } = userService();
    return await getAllUsers({ page, page_size, search, accessToken });
  },
);

export default fetchContacts;
