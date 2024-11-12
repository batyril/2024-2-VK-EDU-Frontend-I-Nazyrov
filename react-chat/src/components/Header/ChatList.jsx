import * as styles from './Header.module.scss';
import Menu from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import PAGES from '../../const/pages.js';

function Header({ text }) {
  return (
    <header className={styles.header}>
      <div className={styles.header__icon}>
        <Link to={PAGES.PROFILE}>
          <Menu className={styles.header__menu} />
        </Link>
      </div>
      <div className={styles.header__text}>
        <p className={styles.header__username}>{text}</p>
      </div>
      <div className={styles.header__icon}>
        <Search className={styles.header__search} />
      </div>
    </header>
  );
}

export default Header;
