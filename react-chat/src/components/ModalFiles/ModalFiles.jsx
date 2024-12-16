import * as styles from './ModalFiles.module.scss';
import ModalBase from '../ModalBase/ModalBase.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Spinner from '../Spinner/index.js';

const ModalFiles = ({
  files,
  isModalOpen,
  handleClose,
  handleSubmit,
  isSending,
  deleteFile,
}) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (files.length === 0 && isModalOpen) {
      handleClose();
    }
  }, [files, handleClose, isModalOpen]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    handleSubmit(null, { files, fileText: message.trim() });
    setMessage('');
  };

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
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            placeholder='Введите сообщение'
            onChange={handleInputChange}
            type='text'
            value={message}
          />

          <button
            onClick={handleSend}
            type='submit'
            className={styles.form__send}
            disabled={files.length === 0 && !message.trim()}
          >
            {isSending ? (
              <Spinner width={20} height={20} />
            ) : (
              <SendIcon className={styles.form__sendIcon} />
            )}
          </button>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalFiles;
