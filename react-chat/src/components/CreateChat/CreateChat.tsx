import * as styles from './CreateChat.module.scss';
import Edit from '@mui/icons-material/Edit';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PAGES from '../../const/pages.ts';

export function CreateChat() {
  return (
    <>
      <Link to={PAGES.CONTACTS}>
        <button
          aria-label='Создать новый чат'
          className={clsx(styles.createChat__button, styles.pulse)}
        >
          <Edit className={styles.createChat__edit} />
        </button>
      </Link>
    </>
  );
}

export default CreateChat;
