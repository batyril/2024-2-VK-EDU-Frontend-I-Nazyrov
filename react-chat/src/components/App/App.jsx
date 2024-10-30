import PageChatList from '../../pages/PageChatList/index.js';
import PageChat from '../../pages/PageChat/index.js';
import { ChatContext } from '../../context/chats.js';
import PAGES from '../../const/pages.js';
import { useChats } from '../../hooks/useHook.js';
import { Route, Routes } from 'react-router-dom';
import PageProfile from '../../pages/pageProfile/index.js';

function App() {
  const { userData, setUserData } = useChats();
  return (
    <ChatContext.Provider value={{ userData, setUserData }}>
      <Routes>
        <Route
          path={PAGES.CHAT_LIST}
          element={<PageChatList chats={userData.chats} />}
        />
        <Route
          path={PAGES.CHAT_DETAIL}
          element={<PageChat chats={userData.chats} />}
        />
        <Route
          path={PAGES.PROFILE}
          element={<PageProfile details={userData.user} />}
        />
      </Routes>
    </ChatContext.Provider>
  );
}

export default App;
