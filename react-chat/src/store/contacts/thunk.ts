import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../api/userService';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async ({
    page,
    page_size,
    search,
  }: {
    page: number;
    page_size?: number;
    search?: string;
  }) => {
    const { getAllUsers } = userService();
    return await getAllUsers({ page, page_size, search });
  },
);

export default fetchContacts;
