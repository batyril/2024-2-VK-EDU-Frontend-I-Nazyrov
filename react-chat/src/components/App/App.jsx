import Router from '../../router.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//TODO: сделать декстоп версию
function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
