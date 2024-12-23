import { Link } from 'react-router-dom';
import PAGES from '../const/pages.ts';
import { Header } from '../components/Header';
import ButtonText from '../components/ButtonText/ButtonText.tsx';
import Layout from '../components/Layout/Layout.tsx';
import TranslateForm from '../components/TranslateForm/TranslateForm.tsx';
import ButtonHistory from '../components/ButtonHistory/ButtonHistory.tsx';

const Translation = () => {
  return (
    <section>
      <Header text={'VK Translate'} />
      <Layout>
        <ButtonText />
        <TranslateForm />

        <Link to={PAGES.HISTORY}>
          <ButtonHistory />
        </Link>
      </Layout>
    </section>
  );
};

export default Translation;
