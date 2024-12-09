import { Route, Routes } from 'react-router-dom';
import PAGES from '../const/pages.js';
import Messages from '../pages/MessageList/index.js';
import Profile from '../pages/Profile/index.js';
import Auth from '../pages/Auth/index.js';
import Registration from '../pages/Registration/index.js';
import ChatList from '../pages/ChatList/index.js';
import NotFound from '../pages/NotFound/index.js';
import ContactsList from '../pages/ContactsList/index.js';
import PrivateRouter from './privateRouter.jsx';
import PublicRoute from './publicRoute.jsx';

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
            <Messages />
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
