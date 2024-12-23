import { useState } from 'react';

function useFormValidation(initialValues, validate) {
  const [errors, setErrors] = useState({});

  const validateValues = (values) => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const clearFieldError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));
  };

  return { errors, validateValues, clearFieldError };
}

export default useFormValidation;
