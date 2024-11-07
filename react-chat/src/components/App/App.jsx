import ChatList from '../../pages/chatList/index.js';
import Messages from '../../pages/messages/index.js';
import { ChatContext } from '../../context/chats.js';
import PAGES from '../../const/pages.js';
import { useChats } from '../../hooks/useHook.js';
import { Route, Routes } from 'react-router-dom';
import Profile from '../../pages/profile/index.js';
import NotFound from '../../pages/notFound/notFound.jsx';

function App() {
  const { userData, setUserData } = useChats();
  return (
    <ChatContext.Provider value={{ userData, setUserData }}>
      <Routes>
        <Route
          path={PAGES.CHAT_LIST}
          element={<ChatList chats={userData.chats} />}
        />
        <Route
          path={PAGES.CHAT_DETAIL}
          element={<Messages chats={userData.chats} />}
        />
        <Route
          path={PAGES.PROFILE}
          element={<Profile details={userData.user} />}
        />
        <Route path={PAGES.NOT_FOUND} element={<NotFound />}></Route>
      </Routes>
    </ChatContext.Provider>
  );
}

export default App;
