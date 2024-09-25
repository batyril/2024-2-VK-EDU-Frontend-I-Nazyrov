import { ELEMENTS, scrollToForm } from './UI';
import messages from './db';
import { render } from './render';
import { saveMessagesLS } from './localStorage';

function handleSubmit(event) {
  event.preventDefault();
  const time = new Date();
  const text = ELEMENTS.INPUT.value;
  if (text.length <= 1) {
    return;
  }
  messages.push({ name: 'me', text, time });

  render();
  scrollToForm();
  saveMessagesLS();
  event.target.reset();
}

export default handleSubmit;
