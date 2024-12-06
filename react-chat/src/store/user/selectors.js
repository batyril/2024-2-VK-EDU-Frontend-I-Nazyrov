import { createSelector } from '@reduxjs/toolkit';

const selectUserInfoState = (state) => state.user;

export const selectUserInfoData = createSelector(
  selectUserInfoState,
  (state) => ({
    status: state.status,
    details: state.details,
    error: state.error,
  }),
);

export default selectUserInfoData;
