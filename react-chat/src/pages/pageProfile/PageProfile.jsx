import * as styles from './PageProfile.module.scss';
import Header from '../../components/Header/Chat.jsx';
import ProfileForm from '../../components/ProfileForm/index.js';

function PageProfile({ details }) {
  return (
    <>
      <Header name={'Профиль'} img={details.img} />
      <main className={styles.profile}>
        <ProfileForm />
      </main>
    </>
  );
}

export default PageProfile;
