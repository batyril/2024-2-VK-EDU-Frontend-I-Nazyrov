import '../css/index.css';
import { ELEMENTS } from './UI';
import { loadMessagesLS } from './localStorage';
import { render } from './render';
import handleSubmit from './handlers';

ELEMENTS.FORM.addEventListener('submit', handleSubmit);

render();
loadMessagesLS();
