import * as styles from './ContactsList.module.scss';
import Header from '../../components/Header/ContactList.jsx';
import { useEffect, useRef } from 'react';
import ContactItem from '../../components/ContactItem/index.js';
import Spinner from '../../components/Spinner/index.js';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import selectContactsData from '../../store/contacts/selectors.js';
import { fetchContacts } from '../../store/contacts/thunk.js';

import REQUEST_STATUS from '../../const/request.js';
import { incrementPage, resetContacts } from '../../store/contacts/slice.js';
import useAuthErrorHandler from '../../hooks/useAuthErrorHandler.js';

function ContactsList() {
  const { status, items, error, page, hasMore, count } =
    useSelector(selectContactsData);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0);

  useAuthErrorHandler(error);

  useEffect(() => {
    return () => {
      dispatch(resetContacts());
    };
  }, [dispatch]);

  useEffect(() => {
    if (page > 1) {
      scrollPositionRef.current = containerRef.current.scrollTop;
    }
    dispatch(fetchContacts({ page }));
  }, [dispatch, page]);

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
  }, [inView, hasMore, dispatch, status]);

  return (
    <>
      <Header name={'Список контактов'} />
      <main className={styles.chat} ref={containerRef}>
        {status === REQUEST_STATUS.LOADING && page === 1 && (
          <div className={styles.chat__spinner}>
            <Spinner />
          </div>
        )}
        {error && <div>Ошибка: {error}</div>}

        {items?.length > 0 && (
          <ul className={styles.chat__list}>
            {items.map(({ id, username, avatar }) => (
              <ContactItem img={avatar} id={id} key={id} name={username} />
            ))}
            <li ref={ref}></li>
          </ul>
        )}

        {count === 0 && status !== REQUEST_STATUS.LOADING && (
          <div>Контакты не найдены</div>
        )}
      </main>
    </>
  );
}

export default ContactsList;
