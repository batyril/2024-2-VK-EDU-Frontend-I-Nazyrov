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
import useAuthErrorRedirect from '../../hooks/useAuthErrorRedirect.js';
import SendMessagesForm from '../../components/SendMessageForm/index.js';

function MessageList() {
  const {
    status: messageStatus,
    messages,
    error: messageError,
    page,
    hasMore,
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
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const accessToken = useAuthErrorRedirect(isError);

  useEffect(() => {
    return () => {
      dispatch(resetMessage());
    };
  }, [dispatch]);

  useCentrifuge(chatId, accessToken);

  useEffect(() => {
    dispatch(getChatDetails({ chatId, accessToken }));
    dispatch(fetchUserInfo({ accessToken }));
    dispatch(fetchMessage({ chatId, page, accessToken }));
  }, [accessToken, chatId, dispatch, page]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      dispatch(incrementPage());
    }
  }, [inView, hasMore, dispatch, isLoading]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (messageListRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          messageListRef.current;
        scrollPosition.current =
          (scrollTop / (scrollHeight - clientHeight)) * 100;
      }
    };

    handleBeforeUnload();
    return () => handleBeforeUnload();
  }, [page]);

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      const { scrollHeight, clientHeight } = messageListRef.current;

      if (scrollPosition.current === 0) {
        messageListRef.current.scrollTop = scrollHeight - clientHeight;
      } else {
        const savedScrollPosition = scrollPosition.current / 100;
        const targetScroll =
          (scrollHeight - clientHeight) * (savedScrollPosition + 0.2);

        messageListRef.current.scrollTop = Math.min(
          targetScroll,
          scrollHeight - clientHeight,
        );
      }
    }
  }, [messages, isLoading]);

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
        <div ref={messageListRef} className={styles.message__list}>
          {isLoading && <Spinner />}
          {isError && (
            <p className={styles.message__error}>Ошибка: {isError}</p>
          )}

          {!isLoading &&
            messageStatus === REQUEST_STATUS.SUCCESS &&
            (messages.length > 0 ? (
              messages.map(
                ({ sender, text, created_at, id, voice, files }, index) => (
                  <MessagesItem
                    voice={voice}
                    ref={index === 0 ? ref : null}
                    isSender={sender?.id === userInfo?.id}
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
        <SendMessagesForm
          deleteFile={deleteFile}
          setFiles={setFiles}
          files={files}
          chatId={chatId}
          accessToken={accessToken}
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
