import * as styles from './CreateChat.module.scss';
import Edit from '@mui/icons-material/Edit';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PAGES from '../../const/pages.js';

export function CreateChat() {
  return (
    <>
      <Link to={PAGES.CONTACTS}>
        <button className={clsx(styles.createChat__button, styles.pulse)}>
          <Edit className={styles.createChat__edit} />
        </button>
      </Link>

      {/*{showModal &&*/}
      {/*  createPortal(*/}
      {/*    <ChatModal*/}
      {/*      showModal={showModal}*/}
      {/*      onClose={() => setShowModal(false)}*/}
      {/*    />,*/}
      {/*    document.body,*/}
      {/*  )}*/}
    </>
  );
}

export default CreateChat;
