import { Route, Routes } from 'react-router-dom';
import PAGES from '../const/pages.ts';
import PrivateRouter from './privateRouter.tsx';
import PublicRoute from './publicRoute.tsx';
import {
  Auth,
  ChatList,
  ContactsList,
  NotFound,
  Profile,
  Registration,
  MessageList,
} from '../pages';

const Router = () => {
  return (
    <Routes>
      <Route
        path={PAGES.CHAT_LIST}
        element={
          <PrivateRouter>
            <ChatList />
          </PrivateRouter>
        }
      />
      <Route
        path={PAGES.MESSAGES_LIST}
        element={
          <PrivateRouter>
            <MessageList />
          </PrivateRouter>
        }
      />
      <Route
        path={PAGES.PROFILE}
        element={
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        }
      />
      <Route
        path={PAGES.CONTACTS}
        element={
          <PrivateRouter>
            <ContactsList />
          </PrivateRouter>
        }
      />
      <Route
        path={PAGES.AUTH}
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />
      <Route
        path={PAGES.REGISTRATION}
        element={
          <PublicRoute>
            <Registration />
          </PublicRoute>
        }
      />
      <Route path={PAGES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default Router;
