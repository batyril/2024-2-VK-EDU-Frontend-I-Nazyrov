import * as styles from './Profile.module.scss';
import Header from '../../components/Header/MessageList.jsx';
import { useEffect, useState } from 'react';
import getCurrentUser from '../../api/user/getCurrentUser.js';
import { ProfileForm } from '../../components/Forms';
import Spinner from '../../components/Spinner/index.js';
import createAvatar from '../../helpers/createAvatar.js';
import PAGES from '../../const/pages.js';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCurrentUser();
        setUserDetail(data);
      } catch (err) {
        if (err.message === 'Access token not found') {
          navigate(PAGES.LOGIN);
        }
        setError('Не удалось загрузить данные пользователя. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, []);

  console.log(userDetail);

  return (
    <div>
      <Header
        name={'Профиль'}
        img={
          userDetail.avatar ? userDetail.avatar : createAvatar(userDetail.name)
        }
      />
      <main className={styles.profile}>
        {loading && <Spinner />}
        {error && <p>{error}</p>}
        {!loading && !error && <ProfileForm {...userDetail} />}
      </main>
    </div>
  );
}

export default Profile;
