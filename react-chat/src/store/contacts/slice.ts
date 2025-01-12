import { createSlice } from '@reduxjs/toolkit';
import REQUEST_STATUS from '../../const/request.ts';
import fetchContacts from './thunk.ts';

export interface ContactItem {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: string;
  is_online: boolean;
  last_online_at: string;
}

interface ContactsState {
  count: null | number;
  items: [] | ContactItem[];
  status: null | string;
  error: null | string;
  page: number;
  hasMore: boolean;
  search: null | string;
}

const initialState: ContactsState = {
  items: [],
  status: null,
  error: null,
  page: 1,
  hasMore: true,
  search: null,
  count: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    incrementPage: (state) => {
      if (state.hasMore) {
        state.page += 1;
      }
    },
    resetContacts: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.status = null;
      state.error = null;
    },
    setSearch: (state, action) => {
      state.page = 1;
      state.items = [];
      state.hasMore = false;
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCESS;
        state.count = action.payload.count;
        const newContacts = action.payload.results;
        const isFirstPage = state.page === 1;

        const uniqueContacts = newContacts.filter(
          (newContact: ContactItem) =>
            !state.items.some((contact) => contact.id === newContact.id),
        );

        if (isFirstPage) {
          state.items = uniqueContacts;
        } else {
          state.items = [...state.items, ...uniqueContacts];
        }
        state.hasMore = action.payload.next !== null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = REQUEST_STATUS.ERROR;
        state.error = action.error.message || null;
      })
      .addDefaultCase(() => {});
  },
});

export const { incrementPage, resetContacts, setSearch } =
  contactsSlice.actions;

export default contactsSlice.reducer;
