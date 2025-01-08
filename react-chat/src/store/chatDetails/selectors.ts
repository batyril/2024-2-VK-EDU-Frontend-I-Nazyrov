import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index.ts';

export const selectChatDetails = (state: RootState) => state.chatDetails;

export const selectMessage = createSelector(selectChatDetails, (state) => ({
  status: state.status,
  items: state.items,
  error: state.error,
}));

export default selectMessage;
