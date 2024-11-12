import * as styles from './ContactsList.module.scss';
import Header from '../../components/Header/ChatList.jsx';
import CreateChat from '../../components/CreateChat/index.js';
import { useEffect, useState } from 'react';
import getAllUsers from '../../API/USER/gelAllUsers.js';
import Pagination from '../../components/Pagination/index.js';
import usePagination from '../../hooks/usePagination.js';
import ContactItem from '../../components/ContactItem/index.js';
import Skeleton from '../../components/Skeleton/index.js';

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { pageSize, nextPage, previousPage, setTotalPages, page, totalPages } =
    usePagination();
  const fetchContacts = async (currentPage) => {
    setLoading(true);
    try {
      const data = await getAllUsers({
        page: currentPage,
        page_size: pageSize,
      });
      setContacts(data.results);
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(page);
  }, [page]);

  return (
    <>
      <Header text={'Список контактов'} />
      <main className={styles.chat}>
        {loading && (
          <ul className={styles.chat__list}>
            {Array.from({ length: pageSize }).map((_, index) => (
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
            </ul>
          ) : (
            <div>Контактов еще нет</div>
          ))}

        <Pagination
          page={page}
          totalPages={totalPages}
          onNext={nextPage}
          onPrevious={previousPage}
        />
      </main>
      <CreateChat />
    </>
  );
}

export default ContactsList;
