import * as styles from './Messages.module.scss';
import formatTime from '../../helpers/FormatTime.js';
import clsx from 'clsx';

function Messages({ name, text, time }) {
  return (
    <div
      className={clsx(
        styles.message__block,
        name === 'me' ? styles.message__blockMe : styles.message__blockOther,
      )}
    >
      <p className={styles.message__name}>{name}</p>
      <div className={styles.message__wrapper}>
        <p className={styles.message__text}>{text}</p>
        <p className={styles.message__time}>{formatTime(time)}</p>
      </div>
    </div>
  );
}

export default Messages;
