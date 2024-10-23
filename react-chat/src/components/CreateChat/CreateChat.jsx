import { useState } from 'react';
import { createPortal } from 'react-dom';
import * as styles from './CreateChat.module.scss';
import Edit from '@mui/icons-material/Edit';
import ChatModal from '../ChatModal/index.js';
import clsx from 'clsx';

export function CreateChat() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className={clsx(styles.createChat__button, styles.pulse)}
        onClick={() => setShowModal(true)}
      >
        <Edit className={styles.createChat__edit} />
      </button>
      {showModal &&
        createPortal(
          <ChatModal
            showModal={showModal}
            onClose={() => setShowModal(false)}
          />,
          document.body,
        )}
    </>
  );
}

export default CreateChat;
