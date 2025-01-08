import * as styles from './ChatItem.module.scss';
import DoneAll from '@mui/icons-material/DoneAll';
import formatTime from '../../helpers/FormatTime.ts';
import { Link } from 'react-router-dom';
import createAvatar from '../../helpers/createAvatar.ts';
import { memo, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { LastMessage } from '../../store/chat/slice.ts';

interface ChatItemProps {
  name: string;
  userId: string;
  img: string;
  last_message: LastMessage;
}

function ChatItem({ name, userId, img, last_message }: ChatItemProps) {
  let message = last_message?.text || '';
  const [imageSrc, setImageSrc] = useState<string | null>(null);
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
    <li>
      <Link ref={ref} to={`/chat/${userId}`}>
        <div className={styles.chat__item}>
          {imageSrc && (
            <img
              src={imageSrc}
              alt='avatar'
              width={60}
              height={60}
              className={styles.chat__img}
            />
          )}
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
    </li>
  );
}

export default memo(ChatItem);
