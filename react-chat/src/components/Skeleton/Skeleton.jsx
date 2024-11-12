import * as styles from './Skeleton.module.scss';

const Skeleton = ({ width, height }) => (
  <div className={styles.skeleton} style={{ width, height }}></div>
);

export default Skeleton;
