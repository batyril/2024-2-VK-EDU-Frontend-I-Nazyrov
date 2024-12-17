import * as styles from './ContactItem.module.scss';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/index.js';
import createAvatar from '../../helpers/createAvatar.js';
import { toast } from 'react-toastify';
import chatService from '../../api/chat/index.js';
import { useInView } from 'react-intersection-observer';

const ContactItem = memo(({ name, id, img }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { createChat } = chatService();
  const [imageSrc, setImageSrc] = useState(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setImageSrc(img || createAvatar(name));
    }
  }, [inView, img, name]);

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
        toast.error(
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
    <li ref={ref} onClick={fetchChatInfo} className={styles.chat__item}>
      {loading && (
        <div className={styles.loading}>
          <Spinner />
        </div>
      )}{' '}
      {error && <div className={styles.error}>{error}</div>}{' '}
      {!loading && !error && (
        <>
          <img
            src={imageSrc}
            alt='avatar'
            className={styles.chat__img}
            width={60}
            height={60}
          />
          <div className='chat-item__info'>
            <p className={styles.chat__name}>{name}</p>
          </div>
        </>
      )}
    </li>
  );
});

ContactItem.displayName = 'ContactItem';

export default ContactItem;
