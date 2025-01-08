import { createAsyncThunk } from '@reduxjs/toolkit';
import chatService from '../../api/chat/index.ts';

export const getChatDetails = createAsyncThunk(
  'chat/getChatDetails',
  async ({ chatId }: { chatId: string }) => {
    const { getChatById } = chatService();
    return await getChatById({ chatId });
  },
);

export default getChatDetails;
