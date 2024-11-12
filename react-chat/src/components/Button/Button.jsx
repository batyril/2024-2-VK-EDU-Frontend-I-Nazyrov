import * as styles from './Button.module.scss';
import Spinner from '../Spinner';

export const Button = ({
  handleClick,
  type,
  disabled,
  text,
  isLoading,
  ...rest
}) => {
  return (
    <button
      onClick={handleClick}
      className={styles.button}
      type={type}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? <Spinner width={30} height={30} /> : text}
    </button>
  );
};

export default Button;
