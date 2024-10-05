import { ELEMENTS, scrollToForm } from './UI';
import { getMessagesFromLocalStorage, USER_KEY } from './localStorage';
import { formatTime, getQueryParam } from './helper';

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
  const userId = getQueryParam(USER_KEY);
  if (!userId) return;

  ELEMENTS.MESSAGE_LIST.innerHTML = '';
  const userData = getMessagesFromLocalStorage(userId);
  ELEMENTS.USER_NAME.textContent = userData.name;

  userData.messages.forEach((message) => {
    const messageBlock = createMessageBlock(message);
    ELEMENTS.MESSAGE_LIST.appendChild(messageBlock);
  });
  scrollToForm();
};

export const renderOneMessage = (message) => {
  const messageBlock = createMessageBlock(message);
  ELEMENTS.MESSAGE_LIST.appendChild(messageBlock);
};
