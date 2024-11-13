import * as styles from './ContactItem.module.scss';
import { useState } from 'react';
import createChat from '../../api/chat/createChat.js';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/index.js';
import createAvatar from '../../helpers/createAvatar.js';

function ContactItem({ name, id, img }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchChatInfo = async () => {
    setLoading(true);
    try {
      const response = await createChat({ members: [id], isPrivate: true });
      console.log(response);
      alert('чат создан');
      navigate(`/chat/${response.id}`);
    } catch (err) {
      if (
        err.response.data.members[0] ===
        'Private chat with these members already exists'
      ) {
        alert('чат уже существует');
      } else {
        setError('Ошибка загрузки чата');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={fetchChatInfo} className={styles.chat__item}>
      {loading && (
        <div className={styles.loading}>
          <Spinner />
        </div>
      )}{' '}
      {error && <div className={styles.error}>{error}</div>}{' '}
      {!loading && !error && (
        <>
          <img
            src={img ? img : createAvatar(name)}
            alt='avatar'
            className={styles.chat__img}
          />
          <div className='chat-item__info'>
            <p className={styles.chat__name}>{name}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ContactItem;
