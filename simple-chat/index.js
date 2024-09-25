import './src/css/index.css';
import { ELEMENTS } from './src/js/UI';
import { loadMessagesLS } from './src/js/localStorage';
import { render } from './src/js/render';
import handleSubmit from './src/js/handlers';

ELEMENTS.FORM.addEventListener('submit', handleSubmit);

render();
loadMessagesLS();
