import formatTime from './helper';
import { ELEMENTS, scrollToForm } from './UI';
import { getMessagesFromLocalStorage } from './localStorage';

export const createMessageBlock = ({ text, time, name }) => {
  const item = document.querySelector('#message').content.cloneNode(true);
  item.querySelector('.message__text').textContent = text;
  item.querySelector('.message__time').textContent = formatTime(time);
  item.querySelector('.message__name').textContent = name;

  item
    .querySelector('.message__block')
    .classList.add(
      name === 'me' ? 'message__block--me' : 'message__block--other',
    );

  return item;
};

export const renderMessagesOnStart = () => {
  ELEMENTS.MESSAGE_LIST.innerHTML = '';
  const messages = getMessagesFromLocalStorage();
  messages.forEach((message) => {
    const messageBlock = createMessageBlock(message);
    ELEMENTS.MESSAGE_LIST.appendChild(messageBlock);
  });
  scrollToForm();
};

export const renderOneMessage = (message) => {
  const messageBlock = createMessageBlock(message);
  ELEMENTS.MESSAGE_LIST.appendChild(messageBlock);
};
