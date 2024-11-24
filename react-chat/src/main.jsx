import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './scss/index.scss';
import App from './components/App/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);
