import Router from '../../route/router.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import translate from '../../../ts/utils';

function App() {
  //для теста
  useEffect(() => {
    translate({
      text: 'apple',
      from: 'en',
      to: 'ru',
    }).then((result) => console.log(result));
  });

  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
