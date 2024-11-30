import { createSlice } from '@reduxjs/toolkit';
import REQUEST_STATUS from '../../const/request.js';
import fetchMessage from './thunk.js';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    status: null,
    error: null,
    page: 1,
    hasMore: true,
    search: '',
  },
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
    addMessage: (state, action) => {
      console.log('addMessage', action);
      const newMessage = action.payload;
      const isDuplicate = state.messages.some(
        (msg) => msg.id === newMessage.id,
      );
      if (!isDuplicate) {
        state.messages.push(newMessage);
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
        if (state.page === 1) {
          state.messages = [...action.payload.results];
        } else {
          state.messages = [
            ...state.messages,
            ...action.payload.results,
          ].reverse();
        }

        state.hasMore = action.payload.next !== null;
      })
      .addCase(fetchMessage.rejected, (state, action) => {
        state.status = REQUEST_STATUS.ERROR;
        state.error = action.error.message;
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
