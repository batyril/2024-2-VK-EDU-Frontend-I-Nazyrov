import * as styles from './Header.module.scss';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import PAGES from '../../const/pages.js';
import { Link } from 'react-router-dom';

function Header({ img }) {
  return (
    <header className={styles.header}>
      <Link to={PAGES.CHAT_LIST}>
        <div className={styles.header__icon}>
          <ArrowBackIos className={styles.header__back} />
        </div>
      </Link>

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
