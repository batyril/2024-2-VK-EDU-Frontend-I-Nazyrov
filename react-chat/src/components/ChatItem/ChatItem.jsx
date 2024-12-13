import * as styles from './ChatItem.module.scss';
import DoneAll from '@mui/icons-material/DoneAll';
import formatTime from '../../helpers/FormatTime.js';
import { Link } from 'react-router-dom';
import createAvatar from '../../helpers/createAvatar.js';
import { memo, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function ChatItem({ name, userId, img, last_message }) {
  let message = last_message?.text || '';
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

  if (last_message) {
    if (last_message.voice) {
      message = '🎤 Голосовое сообщение';
    } else if (last_message.files && last_message.files.length > 0) {
      const fileCount = last_message.files.length;
      message = `🌅 Фотография (${fileCount})`;
    }
  }

  return (
    <Link ref={ref} to={`/chat/${userId}`}>
      <div className={styles.chat__item}>
        <img src={imageSrc} alt='avatar' className={styles.chat__img} />
        <div className='chat-item__info'>
          <p className={styles.chat__name}>{name}</p>
          <p className={styles.chat__message}>{message}</p>
        </div>
        {message && (
          <div className={styles.chat__notifications}>
            <p className='chat-item__status'>
              <DoneAll />
            </p>
            {last_message.created_at && (
              <p className='chat-item__time'>
                {formatTime(last_message.created_at)}
              </p>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export default memo(ChatItem);
