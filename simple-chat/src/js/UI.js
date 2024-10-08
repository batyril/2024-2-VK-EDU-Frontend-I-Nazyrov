export const ELEMENTS = {
  MESSAGE_LIST: document.querySelector('.message__list'),
  CHAT_LIST: document.querySelector('.chat-list'),
  INPUT: document.querySelector('.form__input'),
  MESSAGE_FORM: document.getElementById('message__form'),
  USER_NAME: document.querySelector('.header__username'),
  HEADER__AVATAR: document.querySelector('.header__avatar'),
  CREATE_CHAT_BUTTON: document.querySelector('.create-chat'),
  CHAT_DIALOG: document.getElementById('chat-dialog'),
  CLOSE_DIALOG_BUTTON: document.getElementById('close-dialog'),
};

export function scrollToForm() {
  ELEMENTS.MESSAGE_LIST.scrollTop = ELEMENTS.MESSAGE_LIST.scrollHeight;
}
