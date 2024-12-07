import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chat/slice.js';
import contactsSlice from './contacts/slice.js';
import userSlice from './user/slice.js';
import messageSlice from './message/slice.js';
import chatDetailsSlice from './chatDetails/slice.js';
import authSlice from './auth/slice.js';

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

export default store;
