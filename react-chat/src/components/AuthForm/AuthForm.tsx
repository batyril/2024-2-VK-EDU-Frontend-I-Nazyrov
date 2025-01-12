import * as styles from './AuthForm.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PAGES from '../../const/pages.ts';
import FormInput from '../FormElement';
import Button from '../Button/Button.tsx';
import { userService } from '../../api/userService';
import { setTokens } from '../../store/auth/slice.ts';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

interface AuthForm {
  username: string;
  password: string;
}

function AuthForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = userService();
  const [formValues, setFormValues] = useState<AuthForm>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<AuthForm | {}>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value.trim(),
    }));
    setError((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleLoginUser = async () => {
    setLoading(true);
    setError({});
    try {
      const data = await authUser(formValues);

      dispatch(
        setTokens({
          accessToken: data.access,
          refreshToken: data.refresh,
        }),
      );

      navigate(PAGES.CHAT_LIST);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        (error.response?.data?.password || error.response?.data?.username)
      ) {
        setError(error.response.data);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleLoginUser();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormInput
        name='username'
        value={formValues.username}
        onChange={handleChange}
        error={'username' in error ? error.username?.[0] : null}
        placeholder='Логин'
      />
      <FormInput
        name='password'
        value={formValues.password}
        onChange={handleChange}
        type='password'
        error={'password' in error ? error.password?.[0] : null}
        placeholder='Пароль'
      />

      <Button isLoading={loading} text='Войти' type='submit' />
    </form>
  );
}

export default AuthForm;
