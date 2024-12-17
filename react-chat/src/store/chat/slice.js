import { createSlice } from '@reduxjs/toolkit';
import REQUEST_STATUS from '../../const/request.js';
import fetchChat from './thunk.js';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    items: [],
    status: null,
    error: null,
    page: 1,
    hasMore: true,
    search: '',
    count: null,
  },
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
          (newChat) => !state.items.some((chat) => chat.id === newChat.id),
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
        state.error = action.error.message;
      })
      .addDefaultCase(() => {});
  },
});

export const { incrementPage, resetChats } = chatSlice.actions;

export default chatSlice.reducer;
