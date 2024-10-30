import ChatItem from '../../components/ChatItem/ChatItem.jsx';
import * as styles from './PageChatList.module.scss';
import Header from '../../components/Header/ChatList.jsx';
import CreateChat from '../../components/CreateChat/index.js';

function PageChatList({ chats }) {
  return (
    <>
      <Header />
      <main className={styles.chat}>
        <ul className={styles.chat__list}>
          {chats.map(({ userId, name, messages, img }) => {
            const lastMessage =
              messages.length > 0 ? messages[messages.length - 1] : null;
            return (
              <ChatItem
                img={img}
                userId={userId}
                key={userId}
                name={name}
                time={lastMessage ? lastMessage.time : ''}
                text={lastMessage ? lastMessage.text : ''}
              />
            );
          })}
        </ul>
      </main>
      <CreateChat />
    </>
  );
}

export default PageChatList;
