import './src/css/index.css';
import { renderChatOnStart, renderMessagesOnStart } from './src/js/render';
import { ELEMENTS } from './src/js/UI';
import { closeChatDialog, openChatDialog } from './src/js/modal';
import {
  handleChatDialogSubmit,
  handleSubmitMessages,
} from './src/js/handlers';
import setDefaultMessages from './src/js/mockData';

setDefaultMessages();

if (ELEMENTS.MESSAGE_LIST) {
  ELEMENTS.MESSAGE_FORM.addEventListener('submit', handleSubmitMessages);

  renderMessagesOnStart();
}

if (ELEMENTS.CHAT_LIST) {
  ELEMENTS.CREATE_CHAT_BUTTON.addEventListener('click', openChatDialog);
  ELEMENTS.CLOSE_DIALOG_BUTTON.addEventListener('click', closeChatDialog);
  ELEMENTS.CHAT_DIALOG.addEventListener('submit', handleChatDialogSubmit);

  renderChatOnStart();
}
