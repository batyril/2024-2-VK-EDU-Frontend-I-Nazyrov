import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index.ts';

const selectMessageState = (state: RootState) => state.message;

export const selectMessage = createSelector(selectMessageState, (state) => ({
  status: state.status,
  messages: state.messages,
  error: state.error,
  page: state.page,
  hasMore: state.hasMore,
  search: state.search,
  count: state.count,
}));

export default selectMessage;
