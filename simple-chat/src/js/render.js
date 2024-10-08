import { ELEMENTS, scrollToForm } from './UI';
import { getChatByUserId, MESSAGES_KEY, USER_KEY } from './localStorage';
import { formatTime, getQueryParam } from './helper';
import { createAvatarElement } from './avatar';

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

export const createChatBlock = ({ name, messages, userId }) => {
  const item = document.querySelector('#chat').content.cloneNode(true);
  const lastMessage = messages[messages.length - 1];

  const link = item.querySelector('.chat-item');
  link.href = `chat.html?userId=${userId}`;

  if (!lastMessage) {
    item.querySelector('.chat-item__status').remove();
  }

  item.querySelector('.chat-item__name').textContent = name;
  item.querySelector('.chat-item__message').textContent =
    lastMessage?.text ?? '';
  item.querySelector('.chat-item__time').textContent = lastMessage?.time
    ? formatTime(lastMessage?.time)
    : '';

  const imageElement = createAvatarElement(name);

  item.querySelector('.chat-item').prepend(imageElement);

  return item;
};

export const renderChatOnStart = () => {
  ELEMENTS.CHAT_LIST.innerHTML = '';
  const storedChats = JSON.parse(localStorage.getItem(MESSAGES_KEY)) || [];

  storedChats.forEach((item) => {
    const chat = createChatBlock(item);
    ELEMENTS.CHAT_LIST.appendChild(chat);
  });
};

export const renderMessagesOnStart = () => {
  const userId = getQueryParam(USER_KEY);
  if (!userId) return;

  ELEMENTS.MESSAGE_LIST.innerHTML = '';
  const userData = getChatByUserId(userId);
  ELEMENTS.USER_NAME.textContent = userData.name;
  const imageElement = createAvatarElement(userData.name);
  ELEMENTS.HEADER__AVATAR.replaceWith(imageElement);

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
