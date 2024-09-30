import './src/css/index.css';
import { ELEMENTS } from './src/js/UI';
import { setDefaultMessages } from './src/js/localStorage';
import { renderMessagesOnStart } from './src/js/render';
import handleSubmit from './src/js/handlers';

ELEMENTS.FORM.addEventListener('submit', handleSubmit);

setDefaultMessages();
renderMessagesOnStart();
