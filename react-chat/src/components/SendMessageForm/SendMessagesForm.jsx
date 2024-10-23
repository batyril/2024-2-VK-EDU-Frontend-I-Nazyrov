import * as styles from './SendMessagesForm.module.scss';
import SendIcon from '@mui/icons-material/Send';
import { useContext, useState } from 'react';
import { ChatContext } from '../../context/chats.js';

function SendMessagesForm({ userId }) {
  const { setChats } = useContext(ChatContext);
  const [inputText, setInputText] = useState('');
  const handeSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      name: 'me',
      text: inputText,
      time: Date.now(),
    };

    setChats((prevChats) => {
      prevChats.map((chat) => {
        if (chat.userId === userId) {
          chat.messages.push(newMessage);
        }
        return chat;
      });
      return [...prevChats];
    });

    setInputText('');
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <form
      onSubmit={handeSubmit}
      className={styles.form}
      action='/simple-chat/public'
    >
      <input
        required
        onChange={handleChange}
        value={inputText}
        className={styles.form__input}
        name='message-text'
        placeholder='Введите сообщение'
        type='text'
      />
      <button type='submit' className={styles.form__send}>
        <SendIcon className={styles.form__sendIcon} />
      </button>
    </form>
  );
}

export default SendMessagesForm;
