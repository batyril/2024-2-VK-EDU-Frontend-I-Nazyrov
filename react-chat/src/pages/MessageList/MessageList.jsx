import SendMessagesForm from '../../components/SendMessageForm';
import * as styles from './MessageList.module.scss';
import Header from '../../components/Header/MessageList.jsx';
import MessagesItem from '../../components/MessageItem/index.js';
import { useNavigate, useParams } from 'react-router-dom';
import useAutoScrollToBottom from '../../hooks/useAutoScrollToBottom.js';
import { useLayoutEffect, useState } from 'react';
import getMessages from '../../API/MESSAGES/getMessages.js';
import getChatById from '../../API/CHAT/getChatById.js';
import useCentrifuge from '../../hooks/useCentrifuge.js';
import getCurrentUser from '../../API/USER/getCurrentUser.js';
import createAvatar from '../../helpers/createAvatar.js';
import Spinner from '../../components/Spinner/index.js';
import { Player } from '@lottiefiles/react-lottie-player';
import animate from '../../animation/message.json';
import PAGES from '../../const/pages.js';

function MessageList() {
  const navigate = useNavigate();

  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatInfo, setChatInfo] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const messagesEndRef = useAutoScrollToBottom([messages]);

  useCentrifuge(chatId, setMessages);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [messagesData, userData, chatData] = await Promise.all([
        getMessages({ chatId }),
        getCurrentUser(),
        getChatById(chatId),
      ]);

      setMessages(messagesData.results.reverse());
      setUserDetail(userData);
      setChatInfo(chatData);
    } catch (err) {
      if (err.message === 'Access token not found') {
        navigate(PAGES.LOGIN);
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchAllData();
  }, [chatId]);

  return (
    <>
      <Header
        name={chatInfo?.title}
        img={chatInfo?.avatar ? chatInfo?.avatar : createAvatar(name)}
      />
      <main className={styles.chat}>
        <div className={styles.message__list}>
          {loading && <Spinner />}
          {error && <p className={styles.message__error}>Ошибка: {error}</p>}

          {!loading &&
            !error &&
            (messages.length > 0 ? (
              messages.map(({ sender, text, created_at, id }) => (
                <MessagesItem
                  isSender={sender?.id === userDetail?.id}
                  name={sender.username}
                  key={id}
                  text={text}
                  time={created_at}
                />
              ))
            ) : (
              <div className={styles.message__empty}>
                <Player
                  autoplay
                  loop
                  src={animate}
                  style={{ height: '200px', width: '200px' }}
                />
                Здесь пока нет сообщений. Начните общение!
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>
        <SendMessagesForm chatId={chatId} />
      </main>
    </>
  );
}

export default MessageList;
