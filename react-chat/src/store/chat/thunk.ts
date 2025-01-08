import { createAsyncThunk } from '@reduxjs/toolkit';
import chatService from '../../api/chat/index.ts';

export const fetchChat = createAsyncThunk(
  'chat/fetchChat',
  async ({
    page,
    page_size,
    search,
  }: {
    page: number;
    page_size?: number;
    search?: string;
  }) => {
    const { getChats } = chatService();
    return await getChats({ page, page_size, search });
  },
);

export default fetchChat;
