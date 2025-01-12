import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chat/slice.ts';
import contactsSlice from './contacts/slice.ts';
import userSlice from './user/slice.ts';
import messageSlice from './message/slice.ts';
import chatDetailsSlice from './chatDetails/slice.ts';
import authSlice from './auth/slice.ts';

const persistedState = {
  auth: {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  },
};

const store = configureStore({
  reducer: {
    chat: chatSlice,
    chatDetails: chatDetailsSlice,
    contacts: contactsSlice,
    user: userSlice,
    message: messageSlice,
    auth: authSlice,
  },
  preloadedState: persistedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
