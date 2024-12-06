import * as styles from './Profile.module.scss';
import { ProfileForm } from '../../components/Forms';
import Header from '../../components/Header/Profile.jsx';

function Profile() {
  return (
    <div>
      <Header name={'Профиль'} />
      <main className={styles.profile}>
        <ProfileForm />
      </main>
    </div>
  );
}

export default Profile;
