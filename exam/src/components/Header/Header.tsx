import * as styles from './Header.module.scss';

function Header({ text }: { text: string }) {
  return (
    <header className={styles.header}>
      <p className={styles.title}>{text}</p>
    </header>
  );
}

export default Header;
