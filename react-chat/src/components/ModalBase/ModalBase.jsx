import * as styles from './ModalBase.module.scss';
import CloseIcon from '@mui/icons-material/Close';

const ModalBase = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <CloseIcon className={styles.closeIcon} onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default ModalBase;
