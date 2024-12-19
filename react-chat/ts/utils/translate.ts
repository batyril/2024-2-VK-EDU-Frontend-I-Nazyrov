import fetchTranslation from './fetchTranslation';
import { getCached, setCached, generateCacheKey } from './cache';
import { TranslateOptions, TranslationResponse } from './types';

async function translate(
  options: TranslateOptions,
): Promise<TranslationResponse> {
  const { text, from, to } = options;
  const cacheKey = generateCacheKey(text, from, to);

  const cachedResult = getCached(cacheKey);
  if (cachedResult) {
    return {
      translatedText: cachedResult,
    };
  }

  const result = await fetchTranslation(options);

  setCached(cacheKey, result.translatedText);

  return result;
}

export default translate;
