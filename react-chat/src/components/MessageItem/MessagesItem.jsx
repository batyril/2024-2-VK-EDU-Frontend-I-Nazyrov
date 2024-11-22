import * as styles from './MessagesItem.module.scss';
import formatTime from '../../helpers/FormatTime.js';
import clsx from 'clsx';
import { forwardRef } from 'react';

const MessagesItem = forwardRef(function MessagesItem(
  { name, text, time, isSender, voice, files },
  ref,
) {
  console.log(files);
  return (
    <div
      ref={ref}
      className={clsx(
        styles.message__block,
        isSender ? styles.message__blockMe : styles.message__blockOther,
      )}
    >
      {voice && (
        <audio controls className={styles.message__audio}>
          <source src={voice} type='audio/wav' />
          Your browser does not support the audio element.
        </audio>
      )}

      {files && files.length > 0 && (
        <div className={styles.message__images}>
          {files.length === 1 ? (
            <img
              src={files[0].item}
              alt='Message attachment'
              className={styles.message__imageSingle}
            />
          ) : (
            files.map((file, index) => (
              <img
                key={index}
                src={file.item}
                alt='Message attachment'
                className={styles.message__image}
              />
            ))
          )}
        </div>
      )}
      <div className={styles.message__wrapper}>
        {/*<p className={styles.message__name}>{name}</p>*/}
        <p className={styles.message__text}>{text}</p>

        <p className={styles.message__time}>{formatTime(time)}</p>
      </div>
    </div>
  );
});

export default MessagesItem;
