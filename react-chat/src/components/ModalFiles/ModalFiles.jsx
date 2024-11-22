import * as styles from './ModalFiles.module.scss';
import ModalBase from '../ModalBase/ModalBase.jsx';
import Button from '../Button/Button.jsx';
const ModalFiles = ({
  files,
  isModalOpen,
  handleClose,
  handleSubmit,
  isSending,
}) => {
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
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className={styles.imagePreview}
                />
              ) : (
                <span>{file.name}</span>
              )}
            </li>
          ))}
        </ul>
        <Button
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
