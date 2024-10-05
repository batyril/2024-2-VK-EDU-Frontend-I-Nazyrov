import './src/css/index.css';
import { setDefaultMessages } from './src/js/localStorage';
import { renderMessagesOnStart } from './src/js/render';
import { ELEMENTS } from './src/js/UI';
import handleSubmit from './src/js/handlers';

if (ELEMENTS.FORM) {
  ELEMENTS.FORM.addEventListener('submit', handleSubmit);
}

setDefaultMessages();
renderMessagesOnStart();
