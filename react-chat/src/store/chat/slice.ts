import { createSlice } from '@reduxjs/toolkit';
import REQUEST_STATUS from '../../const/request.ts';
import fetchChat from './thunk.ts';

export interface ChatItem {
  id: string;
  title: string;
  members: Member[];
  creator: Creator;
  avatar: string;
  created_at: string;
  updated_at: string;
  is_private: boolean;
  last_message: LastMessage;
  unread_messages_count: number;
}

export interface Member {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  bio?: string;
  avatar?: string;
  is_online: boolean;
  last_online_at: string;
}

export interface Creator {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: string;
  is_online: boolean;
  last_online_at: string;
}

export interface LastMessage {
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

interface chatState {
  items: [] | ChatItem[];
  status: null | string;
  error: null | string;
  page: 1;
  hasMore: boolean;
  search: null | string;
  count: null | number;
}

const initialState: chatState = {
  items: [],
  status: null,
  error: null,
  page: 1,
  hasMore: true,
  search: null,
  count: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    incrementPage: (state) => {
      if (state.hasMore) {
        state.page += 1;
      }
    },
    resetChats: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.status = null;
      state.error = null;
    },
    setSearch: (state, action) => {
      state.page = 1;
      state.items = [];
      state.hasMore = false;
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChat.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchChat.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCESS;
        state.count = action.payload.count;
        const newChats = action.payload.results;
        const isFirstPage = state.page === 1;

        const uniqueChats = newChats.filter(
          (newChat: ChatItem) =>
            !state.items.some((chat) => chat.id === newChat.id),
        );

        if (isFirstPage) {
          state.items = uniqueChats;
        } else {
          state.items = [...state.items, ...uniqueChats];
        }

        state.hasMore = action.payload.next !== null;
      })
      .addCase(fetchChat.rejected, (state, action) => {
        state.status = REQUEST_STATUS.ERROR;
        state.error = action.error.message || null;
      })
      .addDefaultCase(() => {});
  },
});

export const { incrementPage, resetChats } = chatSlice.actions;

export default chatSlice.reducer;
