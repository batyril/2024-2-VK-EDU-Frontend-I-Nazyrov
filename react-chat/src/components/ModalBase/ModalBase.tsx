import * as styles from './ModalBase.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode } from 'react';

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalBase = ({ isOpen, onClose, children }: ModalBaseProps) => {
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
