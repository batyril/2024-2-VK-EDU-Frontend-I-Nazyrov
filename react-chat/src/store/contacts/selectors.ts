import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index.js';

const selectContactState = (state: RootState) => state.contacts;

export const selectContactsData = createSelector(
  selectContactState,
  (state) => ({
    status: state.status,
    items: state.items,
    error: state.error,
    page: state.page,
    hasMore: state.hasMore,
    search: state.search,
    count: state.count,
  }),
);

export default selectContactsData;
