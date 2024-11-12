import * as styles from './MessagesItem.module.scss';
import formatTime from '../../helpers/FormatTime.js';
import clsx from 'clsx';

function MessagesItem({ name, text, time, isSender }) {
  return (
    <div
      className={clsx(
        styles.message__block,
        isSender ? styles.message__blockMe : styles.message__blockOther,
      )}
    >
      <div className={styles.message__wrapper}>
        {/*<p className={styles.message__name}>{name}</p>*/}
        <p className={styles.message__text}>{text}</p>
        <p className={styles.message__time}>{formatTime(time)}</p>
      </div>
    </div>
  );
}

export default MessagesItem;
