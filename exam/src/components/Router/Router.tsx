import { Route, Routes } from 'react-router-dom';
import PAGES from '../../const/pages.ts';
import Translation from '../../pages/Translation.tsx';
import History from '../../pages/History.tsx';
import NotFound from '../../pages/NotFound.tsx';

const Router = () => {
  return (
    <Routes>
      <Route path={PAGES.TRANSLATION} element={<Translation />} />
      <Route path={PAGES.HISTORY} element={<History />} />
      <Route path={PAGES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default Router;
