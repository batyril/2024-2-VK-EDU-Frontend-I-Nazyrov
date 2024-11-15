import ChatItem from '../../components/ChatItem/ChatItem.jsx';
import * as styles from './ChatList.module.scss';
import Header from '../../components/Header/ChatList.jsx';
import CreateChat from '../../components/CreateChat/index.js';
import { useEffect, useState } from 'react';
import getChats from '../../API/CHAT/getChats.js';
import Skeleton from '../../components/Skeleton/index.js';
import usePagination from '../../hooks/usePagination.js';
import Pagination from '../../components/Pagination/index.js';
import { Link, useNavigate } from 'react-router-dom';
import PAGES from '../../const/pages.js';
import { Player } from '@lottiefiles/react-lottie-player';
import animate from '../../animation/noChats.json';

function ChatList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chats, setChats] = useState([]);
  const { pageSize, nextPage, previousPage, setTotalPages, page, totalPages } =
    usePagination();

  useEffect(() => {
    const fetchChats = async (currentPage) => {
      setLoading(true);
      try {
        const data = await getChats({ page: currentPage, page_size: pageSize });
        setChats(data.results);
        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (err) {
        if (err.message === 'Access token not found') {
          navigate(PAGES.LOGIN);
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChats(page);
  }, [page]);

  return (
    <>
      <Header text={'Список чатов'} />
      <main className={styles.chat}>
        {error ? (
          <div className={styles.error}>Произошла ошибка: {error}</div>
        ) : (
          <ul className={styles.chat__list}>
            {loading ? (
              <div>
                {Array.from({ length: 10 }).map((_, index) => (
                  <li key={index}>
                    <Skeleton width='100%' height='69px' />
                  </li>
                ))}
              </div>
            ) : chats.length > 0 ? (
              chats.map(({ id, avatar, last_message, title }) => (
                <ChatItem
                  img={avatar}
                  userId={id}
                  key={id}
                  name={title}
                  time={last_message.created_at}
                  text={last_message.text}
                />
              ))
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
            )}
          </ul>
        )}

        {!error && chats.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onNext={nextPage}
            onPrevious={previousPage}
          />
        )}
      </main>
      <CreateChat />
    </>
  );
}

export default ChatList;
