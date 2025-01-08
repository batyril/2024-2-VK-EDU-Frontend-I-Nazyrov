import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import FormInput from '../FormElement/index.ts';
import Button from '../Button/Button.tsx';

import useFormValidation from '../../hooks/useFormValidation';
import validateProfileForm from '../../helpers/validateProfileForm.js';
import * as styles from './Forms.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo, fetchUserUpdate } from '../../store/user/thunk.ts';
import { toast } from 'react-toastify';
import selectUserInfoData from '../../store/user/selectors.ts';
import AvatarUploader from '../AvatarUploader/AvatarUploader.tsx';
import REQUEST_STATUS from '../../const/request.ts';
import useAuthErrorHandler from '../../hooks/useAuthErrorHandler.ts';
import { AppDispatch } from '../../store';
import { validateValues } from '../../types/validate.ts';

function ProfileForm() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    status,
    error: fetchError,
    details,
  } = useSelector(selectUserInfoData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useAuthErrorHandler(String(fetchError));

  useLayoutEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (isSubmitting) {
      if (status === REQUEST_STATUS.SUCCESS && !fetchError) {
        toast('Данные успешно сохранены');
      } else if (fetchError) {
        toast.error('Ошибка при сохранении данных');
      }
    }
  }, [status, fetchError, isSubmitting]);

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

  const { errors, validateValues, clearFieldError } =
    useFormValidation(validateProfileForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
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

  const updateUserDetails = async (data: validateValues) => {
    if (details?.id) {
      await dispatch(
        fetchUserUpdate({
          ...data,
          id: details?.id,
          username: data.username || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          bio: data.bio || '',
          avatar: data.avatar || '',
        }),
      );
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateValues(formValues)) return;

    setIsSubmitting(true);
    await updateUserDetails(formValues);
    setIsSubmitting(false);
  };

  return (
    <>
      <form noValidate className={styles.form} onSubmit={handleSubmit}>
        <AvatarUploader
          error={fetchError?.avatar?.[0] ?? null}
          avatarUrl={previewAvatar}
          handleChange={handleChange}
        />
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
        <div className={styles.buttons}>
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
