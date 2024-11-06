import * as styles from './ErrorMessage.module.scss';

function ErrorMessage({ message }) {
  if (!message) return null;

  return <p className={styles.error}>{message}</p>;
}

export default ErrorMessage;
