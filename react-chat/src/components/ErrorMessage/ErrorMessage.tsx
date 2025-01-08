import * as styles from './ErrorMessage.module.scss';

function ErrorMessage({ message }: { message: string }) {
  if (!message) return null;
  switch (message) {
    case 'This field may not be blank.':
      return (
        <p className={styles.error}>Это поле обязательно для заполнения</p>
      );
    default:
      return <p className={styles.error}>{message}</p>;
  }
}

export default ErrorMessage;
