import * as styles from './Forms.module.scss';
import { useState } from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import validateProfileForm from '../../helpers/validateProfileForm';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import registerUser from '../../api/user/registerUser.js';
import { useNavigate } from 'react-router-dom';
import FormInput from '../FormElement/index.js';
import Button from '../Button/Button.jsx';
import PAGES from '../../const/pages.js';

function RegistrationForm() {
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
  const [error, setError] = useState({});
  const { errors, validateValues, clearFieldError, clearErrors } =
    useFormValidation(formValues, validateProfileForm);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
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

  const handleReset = () => {
    setFormValues({
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      bio: '',
      avatar: '',
    });
    clearErrors();
    setError({});
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
        setError({ general: 'Ошибка регистрации. Попробуйте снова.' });
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
      {error.general && <ErrorMessage message={error.general} />}
    </form>
  );
}

export default RegistrationForm;
