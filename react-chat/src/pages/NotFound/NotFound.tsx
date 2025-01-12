import * as styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import animate from '../../animation/NotFound.json';
import PAGES from '../../const/pages.ts';
function NotFound() {
  return (
    <div className={styles.notFound}>
      <Player
        autoplay
        loop
        src={animate}
        style={{ height: '300px', width: '300px' }}
      />
      <h2> Страница не найдена</h2>
      <Link to={PAGES.CHAT_LIST}>Вернуться на главную </Link>
    </div>
  );
}

export default NotFound;
