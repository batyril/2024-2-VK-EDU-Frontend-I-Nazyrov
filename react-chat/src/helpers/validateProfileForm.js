function validateProfileForm(values) {
  const errors = {};

  if (values.name.length < 2 || values.name.length > 150) {
    errors.name = 'Имя должно быть от 2 до 150 символов';
  }
  if (values.surname.length < 2 || values.surname.length > 150) {
    errors.surname = 'Фамилия должна быть от 2 до 150 символов';
  }
  if (values.username.length < 2 || values.username.length > 150) {
    errors.username = 'Username должен быть от 2 до 150 символов';
  }
  if (values.bio.length < 5 || values.bio.length > 450) {
    errors.bio = 'Биография должна быть от 5 до 450 символов';
  }

  return errors;
}

export default validateProfileForm;
