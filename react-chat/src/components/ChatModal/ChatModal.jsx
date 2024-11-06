import * as styles from './ChatModal.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { ChatContext } from '../../context/chats.js';
import { v4 as uuidv4 } from 'uuid';
import generateAvatar from '../../helpers/createAvatar.js';
import useEscapeKey from '../../hooks/useEscapeKey.js';
import useClickOutside from '../../hooks/useClickOutside.js';

export function ChatModal({ showModal, onClose }) {
  const { setUserData } = useContext(ChatContext);
  const uniqueId = uuidv4();
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const [inputText, setInputText] = useState('');

  useEscapeKey(onClose);
  useClickOutside(dialogRef, onClose);

  useEffect(() => {
    if (showModal) {
      dialogRef.current.showModal();
      inputRef.current.focus();
    } else {
      dialogRef.current.close();
    }
  }, [showModal, onClose]);

  const handeSubmit = (e) => {
    e.preventDefault();

    const trimmedInputText = inputText.trim();

    if (!trimmedInputText) {
      return;
    }

    const newChat = {
      name: inputText,
      userId: uniqueId,
      messages: [],
      img: generateAvatar(trimmedInputText),
    };
    setUserData((prevData) => ({
      ...prevData,
      chats: [...prevData.chats, newChat],
    }));
    onClose();
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <dialog ref={dialogRef} className={styles.modal}>
      <form onSubmit={handeSubmit} method='dialog'>
        <h2>Создать новый чат</h2>
        <label htmlFor='username'>
          <input
            autoComplete='off'
            onChange={handleChange}
            value={inputText}
            className='form__input'
            placeholder='Введите имя:'
            type='text'
            id='username'
            name='username'
            required
            ref={inputRef}
          />
        </label>

        <div className={styles.modal__buttons}>
          <button
            onClick={onClose}
            className='effects-button'
            type='button'
            id='close-dialog'
          >
            Отмена
          </button>
          <button className='effects-button' type='submit'>
            Создать
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default ChatModal;
