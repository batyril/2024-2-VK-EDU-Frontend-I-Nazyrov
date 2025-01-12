import { createSlice } from '@reduxjs/toolkit';
import REQUEST_STATUS from '../../const/request.ts';
import getChatDetails from './thunk.ts';

interface DetailsState {
  items: { title: string; avatar: string; is_private: boolean } | null;
  status: null | string;
  error: null | string;
  hasMore: boolean;
}

const initialState: DetailsState = {
  items: null,
  status: null,
  error: null,
  hasMore: true,
};

export const chatDetailsSlice = createSlice({
  name: 'chatDetails',
  initialState,
  reducers: {
    resetChatsDetails: (state) => {
      state.items = null;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatDetails.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(getChatDetails.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCESS;
        state.items = action.payload;

        state.hasMore = action.payload.next !== null;
      })
      .addCase(getChatDetails.rejected, (state, action) => {
        state.status = REQUEST_STATUS.ERROR;
        state.error = action.error.message || null;
      })
      .addDefaultCase(() => {});
  },
});

export const { resetChatsDetails } = chatDetailsSlice.actions;

export default chatDetailsSlice.reducer;
