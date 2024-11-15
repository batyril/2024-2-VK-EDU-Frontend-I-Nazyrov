import * as styles from './FormElement.module.scss';
import ErrorMessage from '../../ErrorMessage/ErrorMessage.jsx';

function FormInput({
  label,
  name,
  value,
  onChange,
  error,
  as: Component = 'input',
  type = 'text',
  ...rest
}) {
  return (
    <label className={styles.label}>
      {label}
      <Component
        className={styles.input}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        {...rest}
      />
      <ErrorMessage message={error} />
    </label>
  );
}

export default FormInput;
