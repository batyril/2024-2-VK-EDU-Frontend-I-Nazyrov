export const ELEMENTS = {
  MESSAGE_LIST: document.querySelector('.message__list'),
  INPUT: document.querySelector('.form__input'),
  FORM: document.querySelector('form'),
};

export function scrollToForm() {
  ELEMENTS.MESSAGE_LIST.scrollTop = ELEMENTS.MESSAGE_LIST.scrollHeight;
}
