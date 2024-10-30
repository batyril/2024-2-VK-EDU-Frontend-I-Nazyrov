import * as styles from './ProfileForm.module.scss';
import { useContext, useState } from 'react';
import { ChatContext } from '../../context/chats.js';

function ProfileForm() {
  const { userData, setUserData } = useContext(ChatContext);
  const { name, surname, username, bio } = userData.user;
  const [formValues, setFormValues] = useState({
    name: name || '',
    surname: surname || '',
    username: username || '',
    bio: bio || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormValues({ name: '', surname: '', username: '', bio: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        name: formValues.name,
        surname: formValues.surname,
        username: formValues.username,
        bio: formValues.bio,
      },
    }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Имя
        <input
          minLength={2}
          required
          className={styles.input}
          name='name'
          value={formValues.name}
          onChange={handleChange}
          maxLength={150}
        />
      </label>
      <label className={styles.label}>
        Фамилия
        <input
          minLength={2}
          required
          className={styles.input}
          name='surname'
          value={formValues.surname}
          onChange={handleChange}
          maxLength={150}
        />
      </label>
      <label className={styles.label}>
        username
        <input
          minLength={2}
          required
          className={styles.input}
          name='username'
          value={formValues.username}
          onChange={handleChange}
          maxLength={150}
        />
      </label>
      <label className={styles.label}>
        bio
        <textarea
          minLength={5}
          required
          className={styles.input}
          name='bio'
          value={formValues.bio}
          onChange={handleChange}
          maxLength={450}
        />
      </label>
      <div className={styles.buttons}>
        <button
          onClick={handleReset}
          className={styles.resetButton}
          type='reset'
        >
          Очистить
        </button>
        <button className={styles.submitButton} type='submit'>
          Сохранить
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
