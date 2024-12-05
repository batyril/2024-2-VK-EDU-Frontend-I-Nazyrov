import * as styles from './Auth.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import PAGES from '../../const/pages.js';
import AuthForm from '../../components/AuthForm/AuthForm.jsx';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Auth() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate(PAGES.CHAT_LIST);
    }
  }, [accessToken, navigate]);

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
