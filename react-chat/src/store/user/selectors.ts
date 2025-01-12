import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index.ts';

const selectUserInfoState = (state: RootState) => state.user;

export const selectUserInfoData = createSelector(
  selectUserInfoState,
  (state) => ({
    status: state.status,
    details: state.details,
    error: state.error,
  }),
);

export default selectUserInfoData;
