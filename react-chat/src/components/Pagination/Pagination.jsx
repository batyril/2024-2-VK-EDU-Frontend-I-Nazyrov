// components/Pagination/Pagination.jsx
import * as styles from './Pagination.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import clsx from 'clsx';
function Pagination({ page, totalPages, onNext, onPrevious }) {
  return (
    <div className={styles.pagination}>
      <ArrowBackIosIcon
        onClick={onPrevious}
        disabled={page === 1}
        className={styles.pageButton}
        color={page !== 1 ? '' : 'default'}
      />
      <span>
        {page} / {totalPages}
      </span>
      <ArrowBackIosIcon
        color={page !== totalPages ? 'primary' : 'default'}
        onClick={onNext}
        disabled={page === totalPages}
        className={clsx(styles.pageButton, styles.transform)}
      ></ArrowBackIosIcon>
    </div>
  );
}

export default Pagination;
