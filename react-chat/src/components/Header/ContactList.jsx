import * as styles from './Header.module.scss';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import PAGES from '../../const/pages.js';
import { Link } from 'react-router-dom';
import Search from '@mui/icons-material/Search';

function Header({ name }) {
  return (
    <header className={styles.header}>
      <div className={styles.header__icon}>
        <Link to={PAGES.CHAT_LIST}>
          <ArrowBackIos className={styles.header__back} />
        </Link>
      </div>
      <div className={styles.header__text}>
        <p className={styles.header__username}>{name}</p>
      </div>
      <div className={styles.header__icon}>
        <Search className={styles.header__search} />
      </div>
    </header>
  );
}

export default Header;
