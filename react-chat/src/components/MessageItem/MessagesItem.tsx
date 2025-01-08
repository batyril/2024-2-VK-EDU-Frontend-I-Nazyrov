import * as styles from './MessagesItem.module.scss';
import formatTime from '../../helpers/FormatTime.ts';
import clsx from 'clsx';
import { forwardRef, memo, useState, useEffect, Ref } from 'react';
import DoneAll from '@mui/icons-material/DoneAll';
import { useInView } from 'react-intersection-observer';

interface MessagesItemProps {
  name: string;
  text: string;
  time: string;
  isSender: boolean;
  voice: string;
  files: File[];
  isPrivate: boolean;
}

const MessagesItem = forwardRef(function MessagesItem(
  { name, text, time, isSender, voice, files, isPrivate }: MessagesItemProps,
  ref: Ref<HTMLDivElement>,
) {
  const [visibleFiles, setVisibleFiles] = useState<any[]>([]);

  console.log(visibleFiles, 'visibleFiles');

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && files?.length > 0) {
      setVisibleFiles(
        files.map((file) => {
          if ('item' in file) return file.item;
        }),
      );
    }
  }, [inView, files]);

  return (
    <div
      ref={ref}
      className={clsx(
        styles.message__block,
        isSender ? styles.message__blockMe : styles.message__blockOther,
      )}
    >
      {!isPrivate && <p className={styles.message__name}>{name}</p>}

      {voice && (
        <audio controls className={styles.message__audio}>
          <source src={voice} type='audio/wav' />
          Your browser does not support the audio element.
        </audio>
      )}

      {files && files.length > 0 && (
        <div ref={inViewRef} className={styles.message__images}>
          {files.length === 1 ? (
            <img
              src={visibleFiles[0]}
              alt='Message attachment'
              className={styles.message__imageSingle}
            />
          ) : (
            files.map((_, index) => (
              <img
                key={index}
                src={visibleFiles[index]}
                alt='Message attachment'
                className={styles.message__image}
              />
            ))
          )}
        </div>
      )}

      <div
        className={clsx(styles.message__wrapper, files && styles.file__wrapper)}
      >
        <p className={styles.message__text}>{text}</p>
        <div className={styles.message__status}>
          <p className={styles.message__time}>{formatTime(time)}</p> <DoneAll />
        </div>
      </div>
    </div>
  );
});

export default memo(MessagesItem);
