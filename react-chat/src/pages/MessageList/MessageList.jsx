import * as styles from './MessageList.module.scss';
import Header from '../../components/Header/MessageList.jsx';
import MessagesItem from '../../components/MessageItem/index.js';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useCentrifuge from '../../hooks/useCentrifuge.js';
import createAvatar from '../../helpers/createAvatar.js';
import Spinner from '../../components/Spinner/index.js';
import { Player } from '@lottiefiles/react-lottie-player';
import animate from '../../animation/message.json';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import useDragAndDrop from '../../hooks/useDragAndDrop.js';
import { useDispatch, useSelector } from 'react-redux';
import selectMessage from '../../store/message/selectors.js';
import REQUEST_STATUS from '../../const/request.js';
import fetchMessage from '../../store/message/thunk.js';
import { incrementPage, resetMessage } from '../../store/message/slice.js';
import { selectChatDetails } from '../../store/chatDetails/selectors.js';
import getChatDetails from '../../store/chatDetails/thunk.js';
import { fetchUserInfo } from '../../store/user/thunk.js';
import selectUserInfoData from '../../store/user/selectors.js';
import SendMessagesForm from '../../components/SendMessageForm/index.js';

function MessageList() {
  const {
    status: messageStatus,
    messages,
    error: messageError,
    page,
    hasMore,
    count,
  } = useSelector(selectMessage);
  const {
    status: userInfoStatus,
    error: userInfoError,
    details: userInfo,
  } = useSelector(selectUserInfoData);
  const {
    status: chatStatus,
    error: chatError,
    items: chatDetails,
  } = useSelector(selectChatDetails);

  const isError = chatError || userInfoError || messageError;

  const isLoading =
    messageStatus === REQUEST_STATUS.LOADING ||
    chatStatus === REQUEST_STATUS.LOADING ||
    userInfoStatus === REQUEST_STATUS.LOADING;
  const dispatch = useDispatch();
  const { chatId } = useParams();

  const messageListRef = useRef(null); // Реф для контейнера с сообщениями
  const scrollPosition = useRef(0); // Реф для хранения позиции в процентах

  useEffect(() => {
    return () => {
      dispatch(resetMessage());
    };
  }, [dispatch]);

  useCentrifuge(chatId);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (page > 1 && !isLoading) {
      messageListRef.current.scrollTop = scrollPosition.current;
    }
  }, [isLoading, page]);

  useEffect(() => {
    dispatch(fetchMessage({ chatId, page, page_size: 20 }));
  }, [chatId, dispatch, page]);

  useEffect(() => {
    dispatch(getChatDetails({ chatId }));
    dispatch(fetchUserInfo());
  }, [chatId, dispatch, page]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      scrollPosition.current = messageListRef.current.scrollTop;
      dispatch(incrementPage());
    }
  }, [inView, hasMore, isLoading, dispatch]);

  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    files,
    setFiles,
    deleteFile,
  } = useDragAndDrop();

  return (
    <>
      <Header
        name={chatDetails?.title}
        img={chatDetails?.avatar ? chatDetails?.avatar : createAvatar(name)}
      />
      <main
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={styles.chat}
      >
        <div id='list' ref={messageListRef} className={styles.message__list}>
          {isLoading && page === 1 && messages.length === 0 && <Spinner />}
          {isError && (
            <p className={styles.message__error}>Ошибка: {isError}</p>
          )}
          {messages.length > 0 &&
            messages.map((message, index) => {
              const lasView = index === messages.length - 10 ? ref : null;
              return (
                <MessagesItem
                  isPrivate={chatDetails?.is_private}
                  voice={message.voice}
                  ref={lasView}
                  isSender={message.sender?.id === userInfo?.id}
                  name={message.sender.username}
                  key={message.id}
                  text={message.text}
                  time={message.created_at}
                  files={message.files}
                />
              );
            })}
          {count === 0 && !isLoading && (
            <div className={styles.message__empty}>
              <Player
                autoplay
                loop
                src={animate}
                style={{ height: '200px', width: '200px' }}
              />
              Здесь пока нет сообщений. Начните общение!
            </div>
          )}
        </div>
        <SendMessagesForm
          deleteFile={deleteFile}
          setFiles={setFiles}
          files={files}
          chatId={chatId}
        />
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
