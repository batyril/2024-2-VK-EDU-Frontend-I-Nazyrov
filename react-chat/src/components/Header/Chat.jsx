import * as styles from './Header.module.scss';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import PAGES from '../../const/pages.js';
import { Link } from 'react-router-dom';

function Header({ name, img }) {
  return (
    <header className={styles.header}>
      <div className={styles.header__icon}>
        <Link to={PAGES.CHAT_LIST}>
          {' '}
          <ArrowBackIos className={styles.header__back} />
        </Link>
      </div>
      <div className={styles.header__text}>
        <p className={styles.header__username}>{name}</p>
      </div>
      <img
        width='40'
        height='40'
        className='header__avatar'
        alt='avatar'
        src={img}
      />
    </header>
  );
}

export default Header;
