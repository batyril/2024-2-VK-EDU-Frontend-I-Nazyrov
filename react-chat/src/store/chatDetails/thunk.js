import { createAsyncThunk } from '@reduxjs/toolkit';
import chatService from '../../api/chat/index.js';

export const getChatDetails = createAsyncThunk(
  'chat/getChatDetails',
  async ({ chatId, accessToken }) => {
    const { getChatById } = chatService();
    return await getChatById({ chatId, accessToken });
  },
);

export default getChatDetails;
