import * as styles from './ContactsList.module.scss';
import Header from '../../components/Header/ContactList.tsx';
import { useEffect, useRef } from 'react';
import ContactItem from '../../components/ContactItem';
import Spinner from '../../components/Spinner/index.ts';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import selectContactsData from '../../store/contacts/selectors.ts';
import { fetchContacts } from '../../store/contacts/thunk.ts';

import REQUEST_STATUS from '../../const/request.ts';
import { incrementPage, resetContacts } from '../../store/contacts/slice.ts';
import useAuthErrorHandler from '../../hooks/useAuthErrorHandler.ts';
import { AppDispatch } from '../../store';

function ContactsList() {
  const { status, items, error, page, hasMore, count } =
    useSelector(selectContactsData);
  const dispatch = useDispatch<AppDispatch>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef(0);

  useAuthErrorHandler(error);

  useEffect(() => {
    return () => {
      dispatch(resetContacts());
    };
  }, [dispatch]);

  useEffect(() => {
    if (page > 1 && containerRef.current) {
      scrollPositionRef.current = containerRef.current.scrollTop;
    }
    dispatch(fetchContacts({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    if (page > 1 && containerRef.current) {
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
