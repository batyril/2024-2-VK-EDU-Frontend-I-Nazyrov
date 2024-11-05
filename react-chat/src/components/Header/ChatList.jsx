import * as styles from './Header.module.scss';
import Menu from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__icon}>
        <Menu className={styles.header__menu} />
      </div>
      <div className={styles.header__text}>
        <p className={styles.header__username}>Messenger</p>
      </div>
      <div className={styles.header__icon}>
        <Search className={styles.header__search} />
      </div>
    </header>
  );
}

export default Header;
