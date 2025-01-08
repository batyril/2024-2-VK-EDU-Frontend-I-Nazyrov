import * as styles from './Header.module.scss';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import PAGES from '../../const/pages.ts';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

function Header({ name }: { name: string }) {
  return (
    <header className={clsx(styles.header)}>
      <Link to={PAGES.AUTH} aria-label='Открыть страницу логина'>
        <div className={styles.header__icon}>
          <ArrowBackIos className={styles.header__back} />{' '}
        </div>
      </Link>

      <div className={styles.header__text}>
        <p className={styles.header__username}>{name}</p>
      </div>
      <div></div>
    </header>
  );
}

export default Header;
