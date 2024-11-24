import SendMessagesForm from '../../components/SendMessageForm';
import * as styles from './MessageList.module.scss';
import Header from '../../components/Header/MessageList.jsx';
import MessagesItem from '../../components/MessageItem/index.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';
import getMessages from '../../api/messages/getMessages.js';
import getChatById from '../../api/chat/getChatById.js';
import useCentrifuge from '../../hooks/useCentrifuge.js';
import getCurrentUser from '../../api/user/getCurrentUser.js';
import createAvatar from '../../helpers/createAvatar.js';
import Spinner from '../../components/Spinner/index.js';
import { Player } from '@lottiefiles/react-lottie-player';
import animate from '../../animation/message.json';
import PAGES from '../../const/pages.js';
import { useInView } from 'react-intersection-observer';

import { useRef } from 'react';
import useDragAndDrop from '../../hooks/useDragAndDrop.js';

function MessageList() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatInfo, setChatInfo] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const messageListRef = useRef(null); // Реф для контейнера с сообщениями
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useCentrifuge(chatId, setMessages);

  const fetchAllData = async (currentPage) => {
    setLoading(true);
    setError(null);

    try {
      const [messagesData, userData, chatData] = await Promise.all([
        getMessages({ chatId, pageSize: 10, page: currentPage }),
        getCurrentUser(),
        getChatById(chatId),
      ]);

      setMessages((prevMessages) => [
        ...messagesData.results.reverse(),
        ...prevMessages,
      ]);
      setUserDetail(userData);
      setChatInfo(chatData);

      if (!messagesData.next) {
        setHasMore(false);
      }
    } catch (err) {
      if (err.message === 'Access token not found') {
        navigate(PAGES.AUTH);
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchAllData(page);
  }, [chatId, page]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    if (!loading && messages.length > 0) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    files,
    setFiles,
  } = useDragAndDrop();

  return (
    <>
      <Header
        name={chatInfo?.title}
        img={chatInfo?.avatar ? chatInfo?.avatar : createAvatar(name)}
      />
      <main
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={styles.chat}
      >
        <div ref={messageListRef} className={styles.message__list}>
          {loading && <Spinner />}
          {error && <p className={styles.message__error}>Ошибка: {error}</p>}

          {!loading &&
            !error &&
            (messages.length > 0 ? (
              messages.map(
                ({ sender, text, created_at, id, voice, files }, index) => (
                  <MessagesItem
                    voice={voice}
                    ref={index === 0 ? ref : null}
                    isSender={sender?.id === userDetail?.id}
                    name={sender.username}
                    key={id}
                    text={text}
                    time={created_at}
                    files={files}
                  />
                ),
              )
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
        </div>
        <SendMessagesForm setFiles={setFiles} files={files} chatId={chatId} />
        {isDragging && (
          <div className={styles.dropArea}>
            <p>Перетащите файлы сюда</p>
          </div>
        )}
      </main>
    </>
  );
}

export default MessageList;
