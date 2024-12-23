import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import languagesData from '../../data/languages.json';
import * as styles from './TranslateForm.module.scss';
import fetchTranslate from '../../api/fetchTranslate.ts';
import { addTranslation } from '../../store/historySlice';

type LanguagesData = {
  [key: string]: string;
};

const languages: LanguagesData = languagesData;

const TranslateForm = () => {
  const dispatch = useDispatch();
  const allLanguages = Object.entries(languagesData);

  const [firstHeaderLanguages, setFirstHeaderLanguages] = useState([
    'en-GB',
    'de-DE',
    'es-ES',
  ]);
  const [secondHeaderLanguages, setSecondHeaderLanguages] = useState([
    'en-GB',
    'fr-FR',
    'pt-PT',
  ]);

  const [selectedLanguageHeader1, setSelectedLanguageHeader1] =
    useState('Autodetect');
  const [selectedLanguageHeader2, setSelectedLanguageHeader2] =
    useState('en-GB');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleLanguageChange = (header: number, language: string) => {
    if (header === 1) {
      setSelectedLanguageHeader1(language);

      setFirstHeaderLanguages((prev) => {
        if (!prev.includes(language) && language !== 'Autodetect') {
          return [language, ...prev.slice(0, 2)];
        }
        return prev;
      });
    }

    if (header === 2) {
      setSelectedLanguageHeader2(language);

      setSecondHeaderLanguages((prev) => {
        if (!prev.includes(language)) {
          return [language, ...prev.slice(0, 2)];
        }
        return prev;
      });
    }
  };

  const handleInputTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    const translate = async () => {
      if (!inputText.trim()) {
        setTranslatedText('');
        return;
      }

      try {
        const result = await fetchTranslate({
          text: inputText,
          from: selectedLanguageHeader1,
          to: selectedLanguageHeader2,
        });
        setTranslatedText(result.translatedText || '');

        const translationHistoryItem = {
          id: new Date().toISOString(),
          inputText,
          translatedText: result.translatedText || '',
          fromLanguage: selectedLanguageHeader1,
          toLanguage: selectedLanguageHeader2,
        };
        dispatch(addTranslation(translationHistoryItem));
      } catch (error) {
        console.error('Ошибка перевода:', error);
      }
    };

    translate();
  }, [inputText, selectedLanguageHeader1, selectedLanguageHeader2, dispatch]);

  return (
    <div className={styles.translate}>
      <form>
        <div className={styles.translate__inputs}>
          {/* Первый блок */}
          <div className={styles.wrapper}>
            <div className={styles.translate__header}>
              <button
                className={
                  selectedLanguageHeader1 === 'Autodetect'
                    ? styles.selected
                    : ''
                }
                onClick={() => handleLanguageChange(1, 'Autodetect')}
              >
                Autodetect
              </button>
              {firstHeaderLanguages.map((code) => (
                <button
                  key={code}
                  className={
                    selectedLanguageHeader1 === code ? styles.selected : ''
                  }
                  onClick={() => handleLanguageChange(1, code)}
                >
                  {languages[code]}
                </button>
              ))}
              <select
                onChange={(e) => handleLanguageChange(1, e.target.value)}
                value=''
              >
                <option value='' disabled hidden>
                  &#9662;
                </option>
                {allLanguages.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              className={styles.translateTo}
              placeholder='Enter text here...'
              value={inputText}
              onChange={handleInputTextChange}
            />
            <div className={styles.translate__footer}>
              <button
                type='button'
                className={styles.micButton}
                aria-label='Start recording'
              >
                🎤
              </button>
              <span className={styles.charCount}>{inputText.length} / 500</span>
            </div>
          </div>

          {/* Второй блок */}
          <div className={styles.wrapper}>
            <div className={styles.translate__header}>
              {secondHeaderLanguages.map((code) => (
                <button
                  type='button'
                  key={code}
                  className={
                    selectedLanguageHeader2 === code ? styles.selected : ''
                  }
                  onClick={() => handleLanguageChange(2, code)}
                >
                  {languages[code]}
                </button>
              ))}
              <select
                onChange={(e) => handleLanguageChange(2, e.target.value)}
                value=''
              >
                <option value='' disabled hidden>
                  &#9662;
                </option>
                {allLanguages.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              placeholder='Translation'
              value={translatedText}
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TranslateForm;
