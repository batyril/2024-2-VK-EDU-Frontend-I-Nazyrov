import * as styles from './SendMessagesForm.module.scss';
import SendIcon from '@mui/icons-material/Send';
import { useState, useRef } from 'react';
import sendMessage from '../../API/messages/sendMessage';

function SendMessagesForm({ chatId }) {
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedInputText = inputText.trim();
    if (!trimmedInputText || sending) return;

    const newMessage = {
      text: trimmedInputText,
      chatId,
    };

    setSending(true);

    try {
      await sendMessage(newMessage);
      setInputText('');
      inputRef.current.focus();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
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
      <button type='submit' className={styles.form__send} disabled={sending}>
        <SendIcon className={styles.form__sendIcon} />
      </button>
    </form>
  );
}

export default SendMessagesForm;
