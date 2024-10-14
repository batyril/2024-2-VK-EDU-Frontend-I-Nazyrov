import { ELEMENTS, scrollToForm } from './UI';
import {
  addMessageToLocalStorage,
  addUserToLocalStorage,
} from './localStorage';
import { renderOneMessage } from './render';

export const handleSubmitMessages = (event) => {
  event.preventDefault();
  const time = new Date();
  const text = ELEMENTS.INPUT.value;
  if (!text.length) {
    return;
  }

  const message = { name: 'me', text, time };
  addMessageToLocalStorage(message);
  renderOneMessage(message);
  scrollToForm();
  event.target.reset();
};

export const handleChatDialogSubmit = (event) => {
  event.preventDefault();
  const username = event.target.elements.username.value;
  if (username) {
    const { userId } = addUserToLocalStorage(username);
    window.location.href = `/chat.html?userId=${userId}`;
  }
};
