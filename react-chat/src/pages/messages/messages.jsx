import SendMessagesForm from '../../components/SendMessageForm';
import * as styles from './messages.module.scss';
import Header from '../../components/Header/Chat.jsx';
import MessagesItem from '../../components/MessageItem/index.js';
import { useParams } from 'react-router-dom';
import useAutoScrollToBottom from '../../hooks/useAutoScrollToBottom.js';

function Messages({ chats }) {
  let { chatId } = useParams();
  const currentChat = chats.find((chat) => String(chat.userId) === chatId);

  const messagesEndRef = useAutoScrollToBottom([currentChat.messages]);

  return (
    <>
      <Header name={currentChat.name} img={currentChat.img} />
      <main className={styles.chat}>
        <div className={styles.message__list}>
          {currentChat.messages.length > 0 ? (
            currentChat.messages.map(({ name, text, time }, index) => (
              <MessagesItem name={name} key={index} text={text} time={time} />
            ))
          ) : (
            <p className={styles.message__empty}> сообщений пока нет </p>
          )}
          <div ref={messagesEndRef} />
        </div>
        <SendMessagesForm userId={currentChat.userId} />
      </main>
    </>
  );
}

export default Messages;
