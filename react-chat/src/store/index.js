import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chat/slice.js';
import contactsSlice from './contacts/slice.js';
import userSlice from './user/slice.js';
import messageSlice from './message/slice.js';
import chatDetailsSlice from './chatDetails/slice.js';
import authSlice from './auth/slice.js';

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('accessToken', state.auth.accessToken);
  localStorage.setItem('refreshToken', state.auth.refreshToken);
  return result;
};

const persistedState = {
  auth: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
