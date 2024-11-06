import * as styles from './ProfileForm.module.scss';
import { useContext, useState } from 'react';
import { ChatContext } from '../../context/chats.js';
import useFormValidation from '../../hooks/useFormValidation';
import validateProfileForm from '../../helpers/validateProfileForm';
import ErrorMessage from '../../ErrorMessage/ErrorMessage.jsx';

function ProfileForm() {
  const { userData, setUserData } = useContext(ChatContext);
  const { name, surname, username, bio } = userData.user;

  const [formValues, setFormValues] = useState({
    name: name || '',
    surname: surname || '',
    username: username || '',
    bio: bio || '',
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { errors, validateValues, clearFieldError, clearErrors } =
    useFormValidation(formValues, validateProfileForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value.trim(),
    }));

    clearFieldError(name);

    setIsDirty(true);
  };

  const handleReset = () => {
    setFormValues({ name: '', surname: '', username: '', bio: '' });
    setIsDirty(true);
    clearErrors();
    setIsSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateValues(formValues)) return;

    setUserData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        ...formValues,
      },
    }));
    setIsDirty(false);
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <form noValidate className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Имя*
        <input
          className={styles.input}
          name='name'
          value={formValues.name}
          onChange={handleChange}
        />
        <ErrorMessage message={errors.name} />
      </label>
      <label className={styles.label}>
        Фамилия*
        <input
          className={styles.input}
          name='surname'
          value={formValues.surname}
          onChange={handleChange}
        />
        <ErrorMessage message={errors.surname} />
      </label>
      <label className={styles.label}>
        username*
        <input
          className={styles.input}
          name='username'
          value={formValues.username}
          onChange={handleChange}
        />
        <ErrorMessage message={errors.username} />
      </label>
      <label className={styles.label}>
        bio*
        <textarea
          className={styles.input}
          name='bio'
          value={formValues.bio}
          onChange={handleChange}
        />
        <ErrorMessage message={errors.bio} />
      </label>
      <div className={styles.buttons}>
        <button
          onClick={handleReset}
          className={styles.resetButton}
          type='reset'
        >
          Очистить
        </button>
        <button
          disabled={!isDirty}
          className={styles.submitButton}
          type='submit'
        >
          Сохранить
        </button>
      </div>
      {isSaved && <p className={styles.successMessage}>Сохранено успешно!</p>}
    </form>
  );
}

export default ProfileForm;
