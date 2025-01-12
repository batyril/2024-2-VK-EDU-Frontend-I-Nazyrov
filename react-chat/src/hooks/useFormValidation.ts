import { useState } from 'react';
import { validateErrors, validateValues } from '../types/validate.ts';

function useFormValidation(
  validate: (values: validateValues) => validateErrors,
) {
  const [errors, setErrors] = useState<validateErrors>({});

  const validateValues = (values: validateValues) => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const clearFieldError = (fieldName: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));
  };

  return { errors, validateValues, clearFieldError };
}

export default useFormValidation;
