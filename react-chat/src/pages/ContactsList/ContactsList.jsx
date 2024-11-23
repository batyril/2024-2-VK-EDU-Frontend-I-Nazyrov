import * as styles from './ContactsList.module.scss';
import Header from '../../components/Header/ContactList.jsx';
import { useEffect, useState, useRef } from 'react';
import getAllUsers from '../../api/user/gelAllUsers.js';
import ContactItem from '../../components/ContactItem/index.js';
import Skeleton from '../../components/Skeleton/index.js';
import PAGES from '../../const/pages.js';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/index.js';
import { useInView } from 'react-intersection-observer';

function ContactsList() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0);

  const fetchContacts = async (currentPage, query) => {
    setLoading(true);
    try {
      const data = await getAllUsers({
        page: currentPage,
        page_size: 15,
        search: query,
      });
      setContacts((prevContacts) => [...prevContacts, ...data.results]);
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
    fetchContacts(page);
  }, [page]);
  useEffect(() => {
    if (page > 1) {
      containerRef.current.scrollTop = scrollPositionRef.current;
    }
  }, [contacts]);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  return (
    <>
      <Header name={'Список контактов'} />
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
          (contacts.length > 0 ? (
            <ul className={styles.chat__list}>
              {contacts.map(({ id, username, avatar }) => (
                <ContactItem img={avatar} id={id} key={id} name={username} />
              ))}
              <div ref={ref}></div>
            </ul>
          ) : (
            <div>Контакты не найдены</div>
          ))}

        {loading && page > 1 && (
          <div className={styles.chat__spinner}>
            <Spinner />
          </div>
        )}
      </main>
    </>
  );
}

export default ContactsList;
