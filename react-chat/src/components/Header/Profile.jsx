import * as styles from './Header.module.scss';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import PAGES from '../../const/pages.js';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

function Header({ name }) {
  return (
    <header className={clsx(styles.header, styles.header__registr)}>
      <Link to={PAGES.CHAT_LIST}>
        <div className={styles.header__icon}>
          <ArrowBackIos className={styles.header__back} />{' '}
        </div>
      </Link>

      <div className={styles.header__text}>
        <p className={styles.header__username}>{name}</p>
      </div>
    </header>
  );
}

export default Header;
