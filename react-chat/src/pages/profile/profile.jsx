import * as styles from './profile.module.scss';
import Header from '../../components/Header/Profile.jsx';
import ProfileForm from '../../components/ProfileForm/index.js';

function Profile({ details }) {
  return (
    <>
      <Header name={'Профиль'} img={details.img} />
      <main className={styles.profile}>
        <ProfileForm />
      </main>
    </>
  );
}

export default Profile;
