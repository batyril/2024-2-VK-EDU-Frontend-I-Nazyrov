import { ELEMENTS, scrollToForm } from './UI';
import {
  addMessageToLocalStorage,
  addUserToLocalStorage,
} from './localStorage';
import { renderChatOnStart, renderOneMessage } from './render';

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
    addUserToLocalStorage(username);
    ELEMENTS.CHAT_DIALOG.close();
    renderChatOnStart();
  }
};
