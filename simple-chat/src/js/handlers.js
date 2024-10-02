import { ELEMENTS, scrollToForm } from './UI';
import { addMessageToLocalStorage } from './localStorage';
import { renderOneMessage } from './render';

function handleSubmit(event) {
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
}

export default handleSubmit;
