import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectChatState = (state: RootState) => state.chat;

export const selectChatData = createSelector(selectChatState, (state) => ({
  status: state.status,
  items: state.items,
  error: state.error,
  page: state.page,
  hasMore: state.hasMore,
  search: state.search,
  count: state.count,
}));

export default selectChatData;
