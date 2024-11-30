import { createSelector } from '@reduxjs/toolkit';

const selectMessageState = (state) => state.message;

export const selectMessage = createSelector(selectMessageState, (state) => ({
  status: state.status,
  messages: state.messages,
  error: state.error,
  page: state.page,
  hasMore: state.hasMore,
  search: state.search,
}));

export default selectMessage;
