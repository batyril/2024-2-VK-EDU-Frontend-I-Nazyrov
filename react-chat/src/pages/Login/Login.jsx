import * as styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import PAGES from '../../const/pages.js';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';

function Login() {
  return (
    <div>
      <main className={styles.container}>
        <div className={styles.login}>
          <h1 className={styles.title}>Вход</h1>
          <LoginForm />
          <p className={styles.registration}>
            У вас еще нет аккаунта?
            <Link to={PAGES.REGISTRATION}> Создайте новый</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
