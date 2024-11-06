import * as styles from './notFound.module.scss';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404 </h1>
      <h2> Страница не найдена</h2>
      <Link to={'/'}>Вернуться на главную </Link>
    </div>
  );
}

export default NotFound;
