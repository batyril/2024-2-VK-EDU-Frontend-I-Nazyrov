import SendMessagesForm from '../../components/SendMessageForm';
import * as styles from './PageChat.module.scss';
import Header from '../../components/Header/Chat.jsx';
import Messages from '../../components/MessageItem/index.js';

function PageChat({ setCurrentPage, chat }) {
  return (
    <>
      <Header img={chat.img} setCurrentPage={setCurrentPage} />
      <main className={styles.chat}>
        <div className={styles.message__list}>
          {chat.messages.map(({ name, text, time }) => (
            <Messages name={name} key={name} text={text} time={time} />
          ))}
        </div>
        <SendMessagesForm userId={chat.userId} />
      </main>
    </>
  );
}

export default PageChat;
