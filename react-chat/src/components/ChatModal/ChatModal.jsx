import * as styles from './ChatModal.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { ChatContext } from '../../context/chats.js';
import { v4 as uuidv4 } from 'uuid';

import generateAvatar from '../../helpers/createAvatar.js';

export function ChatModal({ showModal, onClose }) {
  const { setChats } = useContext(ChatContext);
  const uniqueId = uuidv4();
  const dialogRef = useRef(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (showModal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [showModal]);

  const handeSubmit = (e) => {
    e.preventDefault();
    const newChat = {
      name: inputText,
      userId: uniqueId,
      messages: [],
      img: generateAvatar(inputText),
    };
    setChats((prevChats) => [...prevChats, newChat]);
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
            onChange={handleChange}
            value={inputText}
            className='form__input'
            placeholder='Введите имя:'
            type='text'
            id='username'
            name='username'
            required
          />
        </label>

        <div className={styles.modal__buttons}>
          <button className='effects-button' type='submit'>
            Создать
          </button>
          <button
            onClick={onClose}
            className='effects-button'
            type='button'
            id='close-dialog'
          >
            Отмена
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default ChatModal;
