import * as styles from './Header.module.scss';
import Menu from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import PAGES from '../../const/pages.js';
import Search from '@mui/icons-material/Search';

function Header({ text }) {
  return (
    <header className={styles.header}>
      <Link to={PAGES.PROFILE} aria-label='Открыть профиль'>
        <div className={styles.header__icon}>
          <Menu className={styles.header__menu} />{' '}
        </div>
      </Link>

      <div className={styles.header__text}>
        <p className={styles.header__username}>{text}</p>
      </div>
      <button className={styles.header__icon}>
        <Search className={styles.header__search} />
      </button>
    </header>
  );
}

export default Header;
