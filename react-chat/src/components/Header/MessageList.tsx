import * as styles from './Header.module.scss';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import PAGES from '../../const/pages.ts';
import { Link } from 'react-router-dom';

function Header({ name, img }: { name: string; img: string }) {
  return (
    <header className={styles.header}>
      <Link to={PAGES.CHAT_LIST} aria-label='Открыть список чатов'>
        <div className={styles.header__icon}>
          <ArrowBackIos className={styles.header__back} />
        </div>
      </Link>

      <div className={styles.header__text}>
        <p className={styles.header__username}>{name}</p>
      </div>
      <img
        width='40'
        height='40'
        src={img}
        alt='avatar'
        className={styles.chat__img}
      />
    </header>
  );
}

export default Header;
