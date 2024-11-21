import { useState, useRef } from 'react';
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

function SendMessagesForm({ chatId }) {
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const inputRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { error, getLocation } = useGeolocation();

  const handleSubmit = async (e, { voice = null, location = null } = {}) => {
    console.log(voice, 'voice');
    if (e) e.preventDefault();
    if (sending) return;
    setSending(true);

    let newMessage = null;

    if (voice) {
      newMessage = { voice, chatId };
    } else if (location) {
      newMessage = { text: location, chatId };
    } else {
      const trimmedInputText = inputText.trim();
      if (!trimmedInputText) {
        setSending(false);
        return;
      }
      newMessage = { text: trimmedInputText, chatId };
    }

    try {
      await sendMessage(newMessage);
      setInputText('');
      inputRef.current?.focus();
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      toast.error('Не удалось отправить сообщение');
    } finally {
      setSending(false);
    }
  };

  const { startRecording, isRecording, deleteAudioMessage, sendAudioMessage } =
    useAudioRecorder(handleSubmit);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleLocation = async () => {
    if (error === 'User denied Geolocation') {
      toast.error('Пользователь запретил доступ к геолокации');
      setIsDropdownOpen(false);
      return;
    }
    try {
      const data = await getLocation();
      await handleSubmit(null, data);
      setIsDropdownOpen(false);
    } catch (error) {
      toast.error(
        'Ошибка при получении геолокации. Пожалуйста, попробуйте снова.',
      );
    }
  };

  const handleFile = () => {
    // Handle file selection logic
    setIsDropdownOpen(false);
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
                <div className={styles.form__dropdownItem} onClick={handleFile}>
                  <FolderIcon />
                  File
                </div>
              </div>
            )}
          </div>
        )}
      </label>
      {inputText ? (
        <button type='submit' className={styles.form__send} disabled={sending}>
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

      <ToastContainer />
    </form>
  );
}

export default SendMessagesForm;
