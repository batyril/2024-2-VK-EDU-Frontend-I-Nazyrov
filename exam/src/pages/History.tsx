import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Header } from '../components/Header';
import Layout from '../components/Layout/Layout.tsx';
import { clearHistory } from '../store/historySlice.ts';
import { useDispatch } from 'react-redux';
import languagesData from '../data/languages.json';
import * as styles from './History.module.scss';
import { Link } from 'react-router-dom';
import PAGES from '../const/pages.ts';

type LanguagesData = {
  [key: string]: string;
};

const languages: LanguagesData = languagesData;

const History = () => {
  const dispatch = useDispatch();

  const history = useSelector((state: RootState) => state.history.translations);

  return (
    <section>
      <Header text={'История'} />
      <div className={styles.clear_history}>
        <Link to={PAGES.TRANSLATION}>
          <button>На главную</button>
        </Link>

        <button onClick={() => dispatch(clearHistory())}>
          Очистить историю
        </button>
      </div>
      <Layout>
        {history.length === 0 ? (
          <p>История пуста</p>
        ) : (
          <div>
            {history.map((item, index) => (
              <div className={styles.history_item} key={index}>
                <h3>
                  {languages[item.fromLanguage]} →{languages[item.toLanguage]}
                </h3>
                <div className={styles.history_old}>
                  <p>{item.inputText}</p>
                </div>
                <div className={styles.history_new}>
                  <p>{item.translatedText}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Layout>
    </section>
  );
};

export default History;
