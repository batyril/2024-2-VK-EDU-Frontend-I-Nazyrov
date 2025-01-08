import { createAsyncThunk } from '@reduxjs/toolkit';
import { messageService } from '../../api/messages';

export const fetchMessage = createAsyncThunk(
  'message/fetchMessage',
  async ({
    chatId,
    page,
    pageSize,
    search,
  }: {
    chatId: string;
    page: number;
    pageSize?: number;
    search?: string;
  }) => {
    const { getMessages } = messageService();
    return await getMessages({ page, chatId, pageSize, search });
  },
);

export default fetchMessage;
