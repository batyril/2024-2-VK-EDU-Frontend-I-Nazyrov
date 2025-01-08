import * as styles from './FormElement.module.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import { ChangeEvent, ElementType } from 'react';

interface FormElementProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string | null;
  as?: ElementType;
  placeholder?: string;
}

function FormInput({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  as: Component = 'input',
  type = 'text',
  ...rest
}: FormElementProps) {
  return (
    <label className={styles.label}>
      {label}
      <Component
        className={styles.input}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        {...rest}
      />
      {error && <ErrorMessage message={error} />}
    </label>
  );
}

export default FormInput;
