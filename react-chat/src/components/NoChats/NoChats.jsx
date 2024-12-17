import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import styles from './NoChats.module.scss';
import PAGES from '../../const/pages.js';
import animate from '../../animation/noChats.json';

const NoChats = () => {
  return (
    <div className={styles.noChats}>
      <p>
        Чатов пока нет <br /> Перейдите в контакты, чтобы начать новый чат
      </p>
      <Player
        autoplay
        loop
        src={animate}
        style={{ height: '300px', width: '300px' }}
      />
      <Link to={PAGES.CONTACTS}>Перейти в контакты</Link>
    </div>
  );
};

export default NoChats;
