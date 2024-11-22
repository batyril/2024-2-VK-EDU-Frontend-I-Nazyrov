import { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as styles from './SendMessagesForm.module.scss';
import sendMessage from '../../api/messages/sendMessage.js';
import useGeolocation from '../../hooks/useGeolocation.js';
//icons
import MapIcon from '@mui/icons-material/Map';
import FolderIcon from '@mui/icons-material/Folder';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import useAudioRecorder from '../../hooks/useAudioRecorder.js';
import RecordingControls from '../RecordingControls/index.js';
import ModalFiles from '../ModalFiles/index.js';

function SendMessagesForm({ chatId, files, setFiles }) {
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { error, getLocation } = useGeolocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (files && files.length > 0) {
      setIsModalOpen(true);
    }
  }, [files]);

  const handleSubmit = async (
    e,
    { voice = null, location = null, files = null } = {},
  ) => {
    if (e) e.preventDefault();
    if (isSending) return;
    setIsSending(true);

    let newMessage = null;
    const trimmedInputText = inputText.trim();

    switch (true) {
      case voice !== null:
        newMessage = { voice, chatId };
        break;
      case location !== null:
        newMessage = { text: location, chatId };
        break;
      case files !== null:
        newMessage = { chatId, files };
        break;
      default:
        if (!trimmedInputText) {
          setIsSending(false);
          return;
        }
        newMessage = { text: trimmedInputText, chatId };
    }

    try {
      await sendMessage(newMessage);
      setInputText('');
      setFiles([]);
      fileInputRef.current.value = '';
      inputRef.current?.focus();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      toast.error('Не удалось отправить сообщение');
    } finally {
      setIsSending(false);
    }
  };

  const { startRecording, isRecording, deleteAudioMessage, sendAudioMessage } =
    useAudioRecorder(handleSubmit);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFiles = () => {
    console.log(fileInputRef, 'fileInputRef');
    fileInputRef.current.click();
    setIsDropdownOpen(false);
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setIsModalOpen(true);
  };

  const handleLocation = async () => {
    if (error === 'User denied Geolocation') {
      toast.error('Пользователь запретил доступ к геолокации');
      setIsDropdownOpen(false);
      return;
    }
    try {
      const data = await getLocation();
      await handleSubmit(null, { location: data });
      setIsDropdownOpen(false);
    } catch (error) {
      toast.error(
        'Ошибка при получении геолокации. Пожалуйста, попробуйте снова.',
      );
    }
  };
  //TODO: вынести Dropdown

  const handleClose = () => {
    setFiles([]);
    setIsModalOpen(false);
    fileInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <label className={styles.form__label}>
        <input
          ref={inputRef}
          autoComplete='off'
          required
          onChange={handleChange}
          value={inputText}
          className={styles.form__input}
          name='message-text'
          placeholder='Введите сообщение'
          type='text'
        />
        <input
          type='file'
          multiple
          accept='image/*'
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        {isRecording && <div className={styles.form__recordingIndicator} />}
        {!isRecording && (
          <div
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            className={styles.form__attachMenu}
          >
            <AttachFileIcon className={styles.form__attachIcon} />
            {isDropdownOpen && (
              <div className={styles.form__dropdown}>
                <div
                  className={styles.form__dropdownItem}
                  onClick={handleLocation}
                >
                  <MapIcon /> Location
                </div>
                <div
                  onClick={handleFiles}
                  className={styles.form__dropdownItem}
                >
                  <FolderIcon />
                  File
                </div>
              </div>
            )}
          </div>
        )}
      </label>
      {inputText ? (
        <button
          type='submit'
          className={styles.form__send}
          disabled={isSending}
        >
          <SendIcon className={styles.form__sendIcon} />
        </button>
      ) : (
        <RecordingControls
          isRecording={isRecording}
          startRecording={startRecording}
          deleteAudioMessage={deleteAudioMessage}
          sendAudioMessage={sendAudioMessage}
        />
      )}

      <ModalFiles
        handleClose={handleClose}
        isSending={isSending}
        setIsModalOpen={setIsModalOpen}
        files={files}
        setFiles={setFiles}
        isModalOpen={isModalOpen}
        handleSubmit={handleSubmit}
      />

      <ToastContainer />
    </form>
  );
}

export default SendMessagesForm;
