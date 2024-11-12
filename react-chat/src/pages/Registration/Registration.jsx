import * as styles from './Registration.module.scss';
import RegistrationForm from '../../components/Forms/RegistrationForm.jsx';

function Registration() {
  return (
    <div>
      <main className={styles.login}>
        <h1 className={styles.title}>Регистрация</h1>
        <RegistrationForm />
      </main>
    </div>
  );
}

export default Registration;
