import * as styles from './ChatItem.module.scss';
import DoneAll from '@mui/icons-material/DoneAll';
import formatTime from '../../helpers/FormatTime.js';
import PAGES from '../../const/pages.js';
// import Check from '@mui/icons-material/Check';

function ChatItem({
  name,
  userId,
  img,
  text,
  time,
  setCurrentPage,
  setActiveChat,
}) {
  const handleClick = () => {
    setCurrentPage(PAGES.CHAT_DETAIL);
    setActiveChat(userId);
  };

  return (
    <div onClick={handleClick} className={styles.chat__item}>
      <img src={img} alt='avatart' className={styles.chat__img} />
      <div className='chat-item__info'>
        <p className={styles.chat__name}>{name}</p>
        <p className='chat-item__message'>{text}</p>
      </div>
      {text && (
        <div className={styles.chat__notifications}>
          {}
          <p className='chat-item__status'>
            <DoneAll />
          </p>
          <p className='chat-item__time'>{time && formatTime(time)}</p>
        </div>
      )}
    </div>
  );
}

export default ChatItem;
