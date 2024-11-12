import * as styles from './LoginForm.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../ErrorMessage/ErrorMessage.jsx';
import loginUser from '../../API/USER/loginUser.js';
import PAGES from '../../const/pages.js';
import FormInput from '../FormElement/index.js';
import Button from '../Button/Button.jsx';

function LoginForm() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value.trim(),
    }));
    setError((prevErrors) => ({ ...prevErrors, [name]: '' }));

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
        setError({
          general: 'Не удалось войти в систему',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLoginUser();
    setIsDirty(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormInput
        name='username'
        value={formValues.username}
        onChange={handleChange}
        error={error.username?.[0]}
        placeholder='Логин'
      />
      <FormInput
        name='password'
        value={formValues.password}
        onChange={handleChange}
        type='password'
        error={error.password?.[0]}
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
