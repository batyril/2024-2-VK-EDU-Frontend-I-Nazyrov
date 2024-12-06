import { createSelector } from '@reduxjs/toolkit';

export const selectChatDetails = (state) => state.chatDetails;

export const selectMessage = createSelector(selectChatDetails, (state) => ({
  status: state.status,
  items: state.messages,
  error: state.error,
}));

export default selectMessage;
