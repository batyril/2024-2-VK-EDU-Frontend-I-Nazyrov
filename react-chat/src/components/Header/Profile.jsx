import * as styles from './Header.module.scss';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import PAGES from '../../const/pages.js';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { clearTokens } from '../../store/auth/slice.js';

function Header({ name }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearTokens());
    navigate(PAGES.AUTH);
  };

  return (
    <header className={clsx(styles.header)}>
      <Link to={PAGES.CHAT_LIST}>
        <div className={styles.header__icon}>
          <ArrowBackIos className={styles.header__back} />{' '}
        </div>
      </Link>

      <div className={styles.header__text}>
        <p className={styles.header__username}>{name}</p>
      </div>
      <div onClick={handleLogout} className={clsx(styles.header__icon)}>
        <LogoutIcon className={styles.header__back} />
      </div>
    </header>
  );
}

export default Header;
