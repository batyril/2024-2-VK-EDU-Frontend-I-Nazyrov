import PageChatList from './pages/PageChatList';
import { useState } from 'react';
import PageChat from './pages/PageChat/index.js';
import { ChatContext } from './context/chats.js';
import PAGES from './const/pages.js';
import { useChats } from './hooks/useHook.js';

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.CHAT_LIST);
  const [activeChat, setActiveChat] = useState(null);
  const { chats, setChats } = useChats();

  console.log(chats, '@chats app');
  console.log(activeChat, 'activeChat');
  const chat = chats.find((chat) => chat.userId === activeChat);

  return (
    <ChatContext.Provider value={{ chats, setChats }}>
      {currentPage === PAGES.CHAT_LIST && (
        <PageChatList
          chats={chats}
          setActiveChat={setActiveChat}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === PAGES.CHAT_DETAIL && (
        <PageChat chat={chat} setCurrentPage={setCurrentPage} />
      )}
    </ChatContext.Provider>
  );
}

export default App;
