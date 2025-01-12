import {
  useState,
  useRef,
  useEffect,
  FormEvent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';
import { toast } from 'react-toastify';

import * as styles from './SendMessagesForm.module.scss';
import useGeolocation from '../../hooks/useGeolocation.ts';

import SendIcon from '@mui/icons-material/Send';
import useAudioRecorder from '../../hooks/useAudioRecorder.ts';
import RecordingControls from '../RecordingControls';
import ModalFiles from '../ModalFiles';
import AttachDropdown from '../AttachDropdown/index.ts';
import { messageService } from '../../api/messages';
import { SubmitParams } from '../../types';

interface SendMessagesFormProps {
  chatId: string;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  deleteFile: (name: string) => void;
}

function SendMessagesForm({
  chatId,
  files,
  setFiles,
  deleteFile,
}: SendMessagesFormProps) {
  const { sendMessage } = messageService();
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { error, getLocation } = useGeolocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (files && files.length > 0) {
      setIsModalOpen(true);
    }
  }, [files]);

  const wrapperSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e, {});
  };
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | null,
    {
      voice = null,
      location = null,
      files = null,
      fileText = null,
    }: SubmitParams,
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
        newMessage = { chatId, files, text: fileText };
        break;
      default:
        if (!trimmedInputText) {
          setIsSending(false);
          return;
        }
        newMessage = { text: trimmedInputText, chatId };
    }

    try {
      await sendMessage({ ...newMessage });
      setInputText('');
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setIsDropdownOpen(false);
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (files.length + selectedFiles.length > 5) {
      toast.error('Нельзя загружать больше 5 файлов');
      return;
    }

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

  const handleClose = () => {
    setFiles([]);
    setIsModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={wrapperSubmit} className={styles.form} noValidate>
      <label className={styles.form__label}>
        <input
          disabled={isRecording}
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
          <AttachDropdown
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            handleLocation={handleLocation}
            handleFiles={handleFiles}
          />
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
        deleteFile={deleteFile}
        handleClose={handleClose}
        isSending={isSending}
        files={files}
        isModalOpen={isModalOpen}
        handleSubmit={handleSubmit}
      />
    </form>
  );
}

export default SendMessagesForm;
