import * as styles from './ContactItem.module.scss';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/index.js';
import createAvatar from '../../helpers/createAvatar.js';
import { toast } from 'react-toastify';
import chatService from '../../api/chat/index.js';

const ContactItem = memo(({ name, id, img }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { createChat } = chatService();
  const fetchChatInfo = async () => {
    setLoading(true);
    try {
      const response = await createChat({
        members: [id],
        isPrivate: true,
      });

      toast('чат создан');
      navigate(`/chat/${response.id}`);
    } catch (err) {
      if (
        err.response.data.members[0] ===
        'Private chat with these members already exists'
      ) {
        toast('чат уже существует');
        return;
      }

      if (err.response.data.members[0] === "Can't append current user") {
        toast(
          'Невозможно начать чат с самим собой. Попробуйте выбрать другого пользователя',
        );
        return;
      }

      setError('Ошибка загрузки чата');
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
});

ContactItem.displayName = 'ContactItem';

export default ContactItem;
