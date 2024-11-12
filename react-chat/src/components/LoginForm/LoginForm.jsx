import * as styles from './LoginForm.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../ErrorMessage/ErrorMessage.jsx';
import loginUser from '../../API/USER/loginUser.js';
import PAGES from '../../const/pages.js';
import FormInput from '../FormElement/index.js';
import Button from '../Button/Button.jsx';
import useFormValidation from '../../hooks/useFormValidation.js';
import validateProfileForm from '../../helpers/validateProfileForm.js';

function LoginForm() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { errors, validateValues, clearFieldError } = useFormValidation(
    formValues,
    validateProfileForm,
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value.trim(),
    }));
    setError((prevErrors) => ({ ...prevErrors, [name]: '' }));

    clearFieldError(name);

    setIsDirty(true);
  };

  const handleLoginUser = async () => {
    setLoading(true);
    setError({});
    try {
      const data = await loginUser(formValues);
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      navigate(PAGES.CHAT_LIST);
    } catch (error) {
      if (
        (error.response && error.response.data.password) ||
        error.response.data.username
      ) {
        setError(error.response.data);
      } else {
        setError({ general: 'Ошибка входа. Попробуйте снова.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateValues(formValues)) return;

    await handleLoginUser();
    setIsDirty(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormInput
        name='username'
        value={formValues.username}
        onChange={handleChange}
        error={errors.username || error.username?.[0]}
        placeholder='Логин'
      />
      <FormInput
        name='password'
        value={formValues.password}
        onChange={handleChange}
        type='password'
        error={errors.password || error.password?.[0]}
        placeholder='Пароль'
      />

      <Button
        isLoading={loading}
        text='Войти'
        disabled={!isDirty}
        type='submit'
      />

      {error.general && <ErrorMessage message={error.general} />}
    </form>
  );
}

export default LoginForm;
