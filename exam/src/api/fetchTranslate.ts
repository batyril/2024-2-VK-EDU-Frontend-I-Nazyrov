const TRANSLATION_API = 'https://api.mymemory.translated.net/get';

async function fetchTranslate({
  text,
  from,
  to,
}: {
  text: string;
  from: string;
  to: string;
}) {
  try {
    const apiUrl = `${TRANSLATION_API}?q=${encodeURIComponent(
      text,
    )}&langpair=${from}|${to}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();

    return {
      translatedText: data.responseData.translatedText,
    };
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    throw error;
  }
}

export default fetchTranslate;
