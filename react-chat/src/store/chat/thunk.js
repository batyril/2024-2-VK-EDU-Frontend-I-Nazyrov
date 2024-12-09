import { createAsyncThunk } from '@reduxjs/toolkit';
import chatService from '../../api/chat/index.js';

export const fetchChat = createAsyncThunk(
  'chat/fetchChat',
  async ({ page, page_size, search }) => {
    const { getChats } = chatService();
    return await getChats({ page, page_size, search });
  },
);

export default fetchChat;
