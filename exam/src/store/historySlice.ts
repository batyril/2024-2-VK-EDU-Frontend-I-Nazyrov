import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Translation {
  id: Date;
  fromLanguage: string;
  toLanguage: string;
  inputText: string;
  translatedText: string;
}

interface HistoryState {
  translations: Translation[];
}

const initialState: HistoryState = {
  translations: JSON.parse(localStorage.getItem('translationHistory') || '[]'),
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addTranslation(state, action: PayloadAction<Translation>) {
      state.translations.push(action.payload);
      localStorage.setItem(
        'translationHistory',
        JSON.stringify(state.translations),
      );
    },
    clearHistory(state) {
      state.translations = [];
      localStorage.removeItem('translationHistory');
    },
  },
});

export const { addTranslation, clearHistory } = historySlice.actions;
export default historySlice.reducer;
