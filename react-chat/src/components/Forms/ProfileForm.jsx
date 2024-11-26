import { useEffect, useState } from 'react';
import FormInput from '../FormElement/index.js';
import Button from '../Button/Button.jsx';

import useFormValidation from '../../hooks/useFormValidation';
import validateProfileForm from '../../helpers/validateProfileForm';
import updateUser from '../../api/user/updateUser.js';
import * as styles from './Forms.module.scss';

function ProfileForm({ first_name, last_name, username, bio, id, avatar }) {
  const [error, setError] = useState({});
  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    username: '',
    bio: '',
    avatar: '',
  });

  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(avatar || '');

  useEffect(() => {
    setFormValues({
      first_name: first_name || '',
      last_name: last_name || '',
      username: username || '',
      bio: bio || '',
      avatar: avatar || '',
    });
    setPreviewAvatar(avatar || '');
  }, [first_name, last_name, username, bio, avatar]);

  const { errors, validateValues, clearFieldError, clearErrors } =
    useFormValidation(formValues, validateProfileForm);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        const fileURL = URL.createObjectURL(file);
        setPreviewAvatar(fileURL);
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: file,
        }));
      }
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value.trim(),
      }));
    }

    clearFieldError(name);
  };

  const handleReset = () => {
    setFormValues({ first_name: '', last_name: '', username: '', bio: '' });
    setPreviewAvatar(avatar || '');
    clearErrors();
    setIsSaved(false);
  };

  const handleChangeUserDetails = async () => {
    setLoading(true);
    try {
      await updateUser({ id, ...formValues });
      setError({});
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError({ general: 'Ошибка. Попробуйте снова.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateValues(formValues)) return;

    await handleChangeUserDetails();

    setIsSaved(true);
  };

  return (
    <form noValidate className={styles.form} onSubmit={handleSubmit}>
      <FormInput
        label='Имя*'
        name='first_name'
        value={formValues.first_name}
        onChange={handleChange}
        error={errors.first_name || error.first_name?.[0]}
      />
      <FormInput
        label='Фамилия*'
        name='last_name'
        value={formValues.last_name}
        onChange={handleChange}
        error={errors.last_name || error.last_name?.[0]}
      />
      <FormInput
        label='username*'
        name='username'
        value={formValues.username}
        onChange={handleChange}
        error={errors.username || error.username?.[0]}
      />
      <FormInput
        as='textarea'
        label='bio'
        name='bio'
        value={formValues.bio}
        onChange={handleChange}
        error={errors.bio || error.bio?.[0]}
      />
      <img className={styles.avatar} src={previewAvatar} alt='avatar' />
      <FormInput
        as='input'
        type='file'
        label='Загрузите аватарку:'
        name='avatar'
        onChange={handleChange}
        error={error.avatar?.[0]}
        accept='image/*'
      />
      <div className={styles.buttons}>
        <Button text='Очистить' onClick={handleReset} type='reset' />
        <Button isLoading={loading} text='Сохранить' type='submit' />
      </div>
      {isSaved && <p className={styles.successMessage}>Сохранено успешно!</p>}
    </form>
  );
}

export default ProfileForm;
