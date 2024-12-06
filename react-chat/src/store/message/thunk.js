import { createAsyncThunk } from '@reduxjs/toolkit';
import { messageService } from '../../api/messages/index.js';

export const fetchMessage = createAsyncThunk(
  'message/fetchMessage',
  async ({ chatId, page, page_size, search, accessToken }) => {
    const { getMessages } = messageService();
    return await getMessages({ page, chatId, page_size, search, accessToken });
  },
);

export default fetchMessage;
