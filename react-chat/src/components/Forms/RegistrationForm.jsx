import * as styles from './Forms.module.scss';
import { useState } from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import validateProfileForm from '../../helpers/validateProfileForm';
import { useNavigate } from 'react-router-dom';
import FormInput from '../FormElement/index.js';
import Button from '../Button/Button.jsx';
import PAGES from '../../const/pages.js';
import { userService } from '../../api/userService/index.js';
import AvatarUploader from '../AvatarUploader/AvatarUploader.jsx';
import { toast } from 'react-toastify';

function RegistrationForm() {
  const { registerUser } = userService();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    bio: '',
    avatar: '',
  });
  const [previewAvatar, setPreviewAvatar] = useState('');
  const [error, setError] = useState({});
  const { errors, validateValues, clearFieldError } = useFormValidation(
    formValues,
    validateProfileForm,
  );

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      const fileURL = URL.createObjectURL(file);
      setPreviewAvatar(fileURL);
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files[0],
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
    clearFieldError(name);
    setError((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleRegisterUser = async () => {
    setLoading(true);
    try {
      await registerUser(formValues);
      navigate(PAGES.AUTH);
      setError({});
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateValues(formValues)) return;

    await handleRegisterUser();
  };

  return (
    <form noValidate className={styles.form} onSubmit={handleSubmit}>
      <AvatarUploader
        error={error.avatar?.[0]}
        avatarUrl={previewAvatar}
        handleChange={handleChange}
      />
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
        type='password'
        label='пароль*'
        name='password'
        value={formValues.password}
        onChange={handleChange}
        error={errors.password || error.password?.[0]}
      />
      <FormInput
        as='textarea'
        label='bio'
        name='bio'
        value={formValues.bio}
        onChange={handleChange}
        error={errors.bio || error.bio?.[0]}
      />
      <div className={styles.buttons}>
        <Button isLoading={loading} text='Сохранить' type='submit' />
      </div>
    </form>
  );
}

export default RegistrationForm;
