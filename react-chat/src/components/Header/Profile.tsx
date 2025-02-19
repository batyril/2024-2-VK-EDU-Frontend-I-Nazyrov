import * as styles from './Header.module.scss';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import PAGES from '../../const/pages.ts';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { clearTokens } from '../../store/auth/slice.ts';

function Header({ name }: { name: string }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearTokens());
    navigate(PAGES.AUTH);
  };

  return (
    <header className={clsx(styles.header)}>
      <Link to={PAGES.CHAT_LIST} aria-label='Открыть список чатов'>
        <div className={styles.header__icon}>
          <ArrowBackIos className={styles.header__back} />{' '}
        </div>
      </Link>

      <div className={styles.header__text}>
        <p className={styles.header__username}>{name}</p>
      </div>
      <button onClick={handleLogout} className={clsx(styles.header__icon)}>
        <LogoutIcon className={styles.header__back} />
      </button>
    </header>
  );
}

export default Header;
