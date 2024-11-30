function validateProfileForm(values) {
  const errors = {};

  if (
    values.first_name &&
    (values.first_name.length < 2 || values.first_name.length > 20)
  ) {
    errors.first_name = 'Имя должно быть от 2 до 20 символов';
  }

  if (
    values.last_name &&
    (values.last_name.length < 2 || values.last_name.length > 20)
  ) {
    errors.last_name = 'Фамилия должна быть от 2 до 20 символов';
  }

  if (
    values.username &&
    (values.username.length < 2 || values.username.length > 150)
  ) {
    errors.username = 'Username должен быть от 2 до 150 символов';
  }

  if (
    values.password &&
    (values.password.length < 8 || values.password.length > 150)
  ) {
    errors.password = 'Пароль должен быть от 8 до 150 символов';
  }

  return errors;
}

export default validateProfileForm;
