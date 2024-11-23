import ChatItem from '../../components/ChatItem/ChatItem.jsx';
import * as styles from './ChatList.module.scss';
import Header from '../../components/Header/ChatList.jsx';
import CreateChat from '../../components/CreateChat/index.js';
import { useEffect, useRef, useState } from 'react';
import getChats from '../../api/chat/getChats.js';
import Skeleton from '../../components/Skeleton/index.js';
import { Link, useNavigate } from 'react-router-dom';
import PAGES from '../../const/pages.js';
import { Player } from '@lottiefiles/react-lottie-player';
import animate from '../../animation/noChats.json';
import { useInView } from 'react-intersection-observer';
import Spinner from '../../components/Spinner/index.js';

function ChatList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chats, setChats] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0);

  const fetchChats = async (currentPage) => {
    setLoading(true);
    try {
      const data = await getChats({ page: currentPage, page_size: 15 });
      setChats((prevChats) => [...prevChats, ...data.results]);
      setHasMore(data.next !== null);
    } catch (err) {
      if (err.message === 'Access token not found') {
        navigate(PAGES.AUTH);
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page > 1) {
      scrollPositionRef.current = containerRef.current.scrollTop;
    }
    fetchChats(page);
  }, [page]);

  useEffect(() => {
    if (page > 1) {
      containerRef.current.scrollTop = scrollPositionRef.current;
    }
  }, [chats]);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);
  //TODO:показывать что голосовое  сообщение
  //TODO:показывать что картинки
  return (
    <>
      <Header text={'Список чатов'} />
      <main className={styles.chat} ref={containerRef}>
        {loading && page === 1 && (
          <ul className={styles.chat__list}>
            {Array.from({ length: 10 }).map((_, index) => (
              <li key={index}>
                <Skeleton width='100%' height='69px' />
              </li>
            ))}
          </ul>
        )}
        {error && <div>Ошибка: {error}</div>}
        {!loading &&
          !error &&
          (chats.length > 0 ? (
            <ul className={styles.chat__list}>
              {chats.map(({ id, avatar, last_message, title }) => (
                <ChatItem
                  img={avatar}
                  userId={id}
                  key={id}
                  name={title}
                  time={last_message.created_at}
                  text={last_message.text}
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

        {loading && page > 1 && (
          <div className={styles.chat__spinner}>
            <Spinner />
          </div>
        )}
      </main>
      <CreateChat />
    </>
  );
}

export default ChatList;
