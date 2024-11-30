import { useEffect, useLayoutEffect, useState } from 'react';
import FormInput from '../FormElement/index.js';
import Button from '../Button/Button.jsx';

import useFormValidation from '../../hooks/useFormValidation';
import validateProfileForm from '../../helpers/validateProfileForm';
import * as styles from './Forms.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo, fetchUserUpdate } from '../../store/user/thunk.js';
import { toast } from 'react-toastify';
import selectUserInfoData from '../../store/user/selectors.js';
import useAuthErrorRedirect from '../../hooks/useAuthErrorRedirect.js';
import REQUEST_STATUS from '../../const/request.js';
import Spinner from '../Spinner/index.js';
import { clearError } from '../../store/user/slice.js';

function ProfileForm() {
  const dispatch = useDispatch();
  const {
    status,
    error: fetchError,
    details,
  } = useSelector(selectUserInfoData);

  console.log(fetchError);
  const accessToken = useAuthErrorRedirect(fetchError);

  useLayoutEffect(() => {
    dispatch(fetchUserInfo({ accessToken }));
  }, [accessToken, dispatch]);

  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    username: '',
    bio: '',
    avatar: '',
  });

  const [previewAvatar, setPreviewAvatar] = useState(details?.avatar || '');

  useEffect(() => {
    setFormValues({
      first_name: details?.first_name || '',
      last_name: details?.last_name || '',
      username: details?.username || '',
      bio: details?.bio || '',
      avatar: details?.avatar || '',
    });
    setPreviewAvatar(details?.avatar || '');
  }, [details]);

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
    setPreviewAvatar(details?.avatar || '');
    clearErrors();
    clearError();
  };

  const handleChangeUserDetails = async (data) => {
    await dispatch(fetchUserUpdate({ id: details.id, ...data, accessToken }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateValues(formValues)) return;

    await handleChangeUserDetails(formValues);

    if (!fetchError) {
      toast('Данные успешно сохранены');
    }
  };

  return (
    <>
      <form noValidate className={styles.form} onSubmit={handleSubmit}>
        <FormInput
          label='Имя*'
          name='first_name'
          value={formValues.first_name}
          onChange={handleChange}
          error={errors.first_name || fetchError?.first_name?.[0]}
        />
        <FormInput
          label='Фамилия*'
          name='last_name'
          value={formValues.last_name}
          onChange={handleChange}
          error={errors.last_name || fetchError?.last_name?.[0]}
        />
        <FormInput
          label='username*'
          name='username'
          value={formValues.username}
          onChange={handleChange}
          error={errors.username || fetchError?.username?.[0]}
        />
        <FormInput
          as='textarea'
          label='bio'
          name='bio'
          value={formValues.bio}
          onChange={handleChange}
          error={errors.bio || fetchError?.bio?.[0]}
        />
        <img className={styles.avatar} src={previewAvatar} alt='avatar' />
        <FormInput
          as='input'
          type='file'
          label='Загрузите аватарку:'
          name='avatar'
          onChange={handleChange}
          error={fetchError?.avatar?.[0]}
          accept='image/*'
        />
        <div className={styles.buttons}>
          <Button text='Очистить' onClick={handleReset} type='reset' />
          <Button
            isLoading={status === REQUEST_STATUS.LOADING}
            text='Сохранить'
            type='submit'
          />
        </div>
      </form>
    </>
  );
}

export default ProfileForm;
