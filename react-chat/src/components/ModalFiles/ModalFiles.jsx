import * as styles from './ModalFiles.module.scss';
import ModalBase from '../ModalBase/ModalBase.jsx';
import Button from '../Button/Button.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';

const ModalFiles = ({
  files,
  isModalOpen,
  handleClose,
  handleSubmit,
  isSending,
  deleteFile,
}) => {
  useEffect(() => {
    if (files.length === 0 && isModalOpen) {
      handleClose();
    }
  }, [files]);

  return (
    <ModalBase isOpen={isModalOpen} onClose={handleClose}>
      <div className={styles.modalContent}>
        <h2 className={styles.filesTitle}>
          Загруженные картинки {files.length}
        </h2>
        <ul className={styles.fileList}>
          {files.map((file, index) => (
            <li key={index} className={styles.fileItem}>
              {file.type.startsWith('image/') ? (
                <div className={styles.imageWrapper}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className={styles.imagePreview}
                  />
                  <DeleteIcon
                    className={styles.deleteIcon}
                    onClick={() => deleteFile(file.name)}
                  />
                </div>
              ) : (
                <span>{file.name}</span>
              )}
            </li>
          ))}
        </ul>
        <Button
          disabled={files.length === 0}
          text='Отправить'
          type='submit'
          isLoading={isSending}
          onClick={() => handleSubmit(null, { files })}
        />
      </div>
    </ModalBase>
  );
};

export default ModalFiles;
