import { TranslateOptions, TranslationResponse } from './types';

const API_URL = 'https://api.mymemory.translated.net/get';

async function fetchTranslation(
  options: TranslateOptions,
): Promise<TranslationResponse> {
  const { text, from, to } = options;
  const url = `${API_URL}?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails || 'Translation failed');
    }

    return {
      translatedText: data.responseData.translatedText,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw { message: error.message || 'Network error' };
    } else {
      throw { message: 'Unknown error occurred' };
    }
  }
}

export default fetchTranslation;
