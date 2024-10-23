import * as styles from './Header.module.scss';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';

function Header({ name, img, setCurrentPage }) {
  return (
    <header className={styles.header}>
      <div className={styles.header__icon}>
        <ArrowBackIos
          onClick={() => setCurrentPage('ChatList')}
          className={styles.header__back}
        />
      </div>
      <div className={styles.header__text}>
        <p className={styles.header__username}>{name}</p>
      </div>
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
