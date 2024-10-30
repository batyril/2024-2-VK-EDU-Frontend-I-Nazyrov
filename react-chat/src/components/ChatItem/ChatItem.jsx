import * as styles from './ChatItem.module.scss';
import DoneAll from '@mui/icons-material/DoneAll';
import formatTime from '../../helpers/FormatTime.js';
import { Link } from 'react-router-dom';

// import Check from '@mui/icons-material/Check';

function ChatItem({ name, userId, img, text, time }) {
  return (
    <Link to={`/${userId}`}>
      <div className={styles.chat__item}>
        <img src={img} alt='avatart' className={styles.chat__img} />
        <div className='chat-item__info'>
          <p className={styles.chat__name}>{name}</p>
          <p className='chat-item__message'>{text}</p>
        </div>
        {text && (
          <div className={styles.chat__notifications}>
            <p className='chat-item__status'>
              <DoneAll />
            </p>
            <p className='chat-item__time'>{time && formatTime(time)}</p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default ChatItem;
