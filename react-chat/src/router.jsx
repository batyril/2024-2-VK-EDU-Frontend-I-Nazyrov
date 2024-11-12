import { Route, Routes } from 'react-router-dom';
import PAGES from './const/pages.js';
import Messages from './pages/MessageList';
import Profile from './pages/Profile';
import PageLogin from './pages/Login';
import Registration from './pages/Registration';
import ChatList from './pages/ChatList';
import NotFound from './pages/NotFound';
import ContactsList from './pages/ContactsList';

const Router = () => {
  return (
    <Routes>
      <Route path={PAGES.CHAT_LIST} element={<ChatList />} />
      <Route path={PAGES.MESSAGES_LIST} element={<Messages />} />
      <Route path={PAGES.PROFILE} element={<Profile />} />
      <Route path={PAGES.LOGIN} element={<PageLogin />} />
      <Route path={PAGES.REGISTRATION} element={<Registration />} />
      <Route path={PAGES.NOT_FOUND} element={<NotFound />} />
      <Route path={PAGES.CONTACTS} element={<ContactsList />} />
    </Routes>
  );
};

export default Router;
