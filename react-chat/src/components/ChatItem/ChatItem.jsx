import * as styles from './ChatItem.module.scss';
import DoneAll from '@mui/icons-material/DoneAll';
import formatTime from '../../helpers/FormatTime.js';
import { Link } from 'react-router-dom';
import createAvatar from '../../helpers/createAvatar.js';

function ChatItem({ name, userId, img, last_message }) {
  let message = last_message.text;

  if (last_message) {
    if (last_message.voice) {
      message = '🎤 Голосовое сообщение';
    } else if (last_message.files && last_message.files.length > 0) {
      const fileCount = last_message.files.length;
      message = `🌅 Фотография (${fileCount})`;
    }
  }

  return (
    <Link to={`/chat/${userId}`}>
      <div className={styles.chat__item}>
        <img
          src={img ? img : createAvatar(name)}
          alt='avatar'
          className={styles.chat__img}
        />
        <div className='chat-item__info'>
          <p className={styles.chat__name}>{name}</p>
          <p className={styles.chat__message}>{message}</p>
        </div>
        {message && (
          <div className={styles.chat__notifications}>
            <p className='chat-item__status'>
              <DoneAll />
            </p>
            <p className='chat-item__time'>
              {last_message.time && formatTime(last_message.time)}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default ChatItem;
