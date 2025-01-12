import * as styles from './Button.module.scss';
import Spinner from '../Spinner/index.js';

interface ButtonProps {
  handleClick?: () => void;
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  text: string;
  isLoading: boolean;
}

export const Button = ({
  handleClick,
  type,
  disabled,
  text,
  isLoading,
  ...rest
}: ButtonProps) => {
  return (
    <button
      tabIndex={0}
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
