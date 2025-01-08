import * as styles from './Registration.module.scss';
import RegistrationForm from '../../components/Forms/RegistrationForm.tsx';
import Header from '../../components/Header/Registr.tsx';

function Registration() {
  return (
    <div>
      <Header name={'Регистрация'} />
      <main className={styles.login}>
        <RegistrationForm />
      </main>
    </div>
  );
}

export default Registration;
