import SendMessagesForm from '../../components/SendMessageForm';
import * as styles from './PageChat.module.scss';
import Header from '../../components/Header/Chat.jsx';
import Messages from '../../components/MessageItem/index.js';
import { useParams } from 'react-router-dom';

function PageChat({ chats }) {
  let { chatId } = useParams();
  const currentChat = chats.find((chat) => String(chat.userId) === chatId);

  return (
    <>
      <Header name={currentChat.name} img={currentChat.img} />
      <main className={styles.chat}>
        <div className={styles.message__list}>
          {currentChat.messages.length > 0 ? (
            currentChat.messages.map(({ name, text, time }, index) => (
              <Messages name={name} key={index} text={text} time={time} />
            ))
          ) : (
            <p className={styles.message__empty}> сообщений пока нет </p>
          )}
        </div>
        <SendMessagesForm userId={currentChat.userId} />
      </main>
    </>
  );
}

export default PageChat;
