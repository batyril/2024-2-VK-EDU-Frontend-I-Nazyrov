import * as styles from './Spinner.module.scss';

const Spinner = ({ width = 40, height = 40 }) => (
  <div className={styles.spinner}>
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className={styles.spinner__inner}
    ></div>
  </div>
);

export default Spinner;
