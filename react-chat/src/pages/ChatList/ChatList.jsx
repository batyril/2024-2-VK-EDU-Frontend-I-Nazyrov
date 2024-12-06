import ChatItem from '../../components/ChatItem/ChatItem.jsx';
import * as styles from './ChatList.module.scss';
import Header from '../../components/Header/ChatList.jsx';
import CreateChat from '../../components/CreateChat/index.js';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PAGES from '../../const/pages.js';
import { Player } from '@lottiefiles/react-lottie-player';
import animate from '../../animation/noChats.json';
import { useInView } from 'react-intersection-observer';
import Spinner from '../../components/Spinner/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { incrementPage, resetChats } from '../../store/chat/slice.js';
import selectChatData from '../../store/chat/selectors.js';
import REQUEST_STATUS from '../../const/request.js';
import fetchChat from '../../store/chat/thunk.js';
import useAuthErrorRedirect from '../../hooks/useAuthErrorRedirect.js';

function ChatList() {
  const { status, items, error, page, hasMore } = useSelector(selectChatData);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const accessToken = useAuthErrorRedirect(error);
  useEffect(() => {
    return () => {
      dispatch(resetChats());
    };
  }, [dispatch]);

  useEffect(() => {
    if (page > 1) {
      scrollPositionRef.current = containerRef.current.scrollTop;
    }
    dispatch(fetchChat({ page, accessToken }));
  }, [accessToken, dispatch, page]);

  useEffect(() => {
    if (page > 1) {
      containerRef.current.scrollTop = scrollPositionRef.current;
    }
  }, [items, page]);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasMore && status !== REQUEST_STATUS.LOADING) {
      dispatch(incrementPage());
    }
  }, [inView, status, dispatch, hasMore]);

  return (
    <>
      <Header text={'Список чатов'} />
      <main className={styles.chat} ref={containerRef}>
        {status === REQUEST_STATUS.LOADING && page === 1 && (
          <div className={styles.chat__spinner}>
            <Spinner />
          </div>
        )}
        {error && <div>Ошибка: {error}</div>}
        {status === REQUEST_STATUS.SUCCESS &&
          (items?.length > 0 ? (
            <ul className={styles.chat__list}>
              {items.map(({ id, avatar, last_message, title }) => (
                <ChatItem
                  img={avatar}
                  userId={id}
                  key={id}
                  name={title}
                  last_message={last_message}
                />
              ))}
              <div ref={ref}></div>
            </ul>
          ) : (
            <div className={styles.noChats}>
              <p>
                Чатов пока нет <br /> Перейдите в контакты, чтобы начать новый
                чат
              </p>
              <Player
                autoplay
                loop
                src={animate}
                style={{ height: '300px', width: '300px' }}
              />
              <Link to={PAGES.CONTACTS}>Перейти в контакты</Link>
            </div>
          ))}
      </main>
      <CreateChat />
    </>
  );
}

export default ChatList;
