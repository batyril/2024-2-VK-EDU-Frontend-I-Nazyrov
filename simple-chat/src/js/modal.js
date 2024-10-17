import { ELEMENTS } from './UI';

export const openChatDialog = () => {
  ELEMENTS.CHAT_DIALOG.showModal();
};

export const closeChatDialog = () => {
  ELEMENTS.CHAT_DIALOG.close();
};
