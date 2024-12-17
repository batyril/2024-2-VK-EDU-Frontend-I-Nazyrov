import * as styles from './Header.module.scss';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import PAGES from '../../const/pages.js';
import { Link } from 'react-router-dom';
import Search from '@mui/icons-material/Search';

function Header({ name }) {
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
      <button className={styles.header__icon}>
        <Search className={styles.header__search} />
      </button>
    </header>
  );
}

export default Header;
