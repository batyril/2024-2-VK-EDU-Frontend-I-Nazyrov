import * as styles from './Auth.module.scss';
import { Link } from 'react-router-dom';
import PAGES from '../../const/pages.ts';
import AuthForm from '../../components/AuthForm/AuthForm.tsx';

function Auth() {
  return (
    <div>
      <main className={styles.container}>
        <div className={styles.login}>
          <h1 className={styles.title}>Вход</h1>
          <AuthForm />
          <p className={styles.registration}>
            У вас еще нет аккаунта?
            <Link to={PAGES.REGISTRATION}> Создайте новый</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Auth;
