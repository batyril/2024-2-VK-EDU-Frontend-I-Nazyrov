import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import REQUEST_STATUS from '../../const/request.ts';
import fetchMessage from './thunk.ts';

export interface MessageItem {
  id: string;
  text: string;
  voice: string;
  sender: Sender;
  chat: string;
  files: File[];
  updated_at: string;
  created_at: string;
  was_read_by: string[];
}

export interface Sender {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: string;
  is_online: boolean;
  last_online_at: string;
}

interface MessageState {
  count: null | number;
  messages: MessageItem[];
  status: null | string;
  error: null | string;
  page: number;
  hasMore: boolean;
  search: null | string;
}

const initialState: MessageState = {
  count: null,
  messages: [],
  status: null,
  error: null,
  page: 1,
  hasMore: true,
  search: null,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    incrementPage: (state) => {
      if (state.hasMore) {
        state.page += 1;
      }
    },
    resetMessage: (state) => {
      state.messages = [];
      state.page = 1;
      state.hasMore = true;
      state.status = null;
      state.error = null;
    },
    addMessage: (state, action: PayloadAction<MessageItem>) => {
      const newMessage = action.payload;
      const isDuplicate = state.messages.some(
        (msg) => msg.id === newMessage.id,
      );
      if (!isDuplicate) {
        state.messages.unshift(newMessage);
      }
    },
    updateMessage: (state, action) => {
      const updatedMessage = action.payload;
      state.messages = state.messages.map((msg) =>
        msg.id === updatedMessage.id ? updatedMessage : msg,
      );
    },
    deleteMessage: (state, action) => {
      const messageId = action.payload;
      state.messages = state.messages.filter((msg) => msg.id !== messageId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessage.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchMessage.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCESS;
        state.count = action.payload.count;
        const newMessages = action.payload.results;
        const isFirstPage = state.page === 1;

        const uniqueMessages = newMessages.filter(
          (newMsg: MessageItem) =>
            !state.messages.some((msg) => msg.id === newMsg.id),
        );

        if (isFirstPage) {
          state.messages = uniqueMessages;
        } else {
          state.messages = [...state.messages, ...uniqueMessages];
        }

        state.hasMore = action.payload.next !== null;
      })
      .addCase(fetchMessage.rejected, (state, action) => {
        state.status = REQUEST_STATUS.ERROR;
        state.error = action.error.message || null;
      })
      .addDefaultCase(() => {});
  },
});

export const {
  incrementPage,
  resetMessage,
  addMessage,
  updateMessage,
  deleteMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
