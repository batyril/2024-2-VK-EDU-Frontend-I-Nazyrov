import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import * as styles from './RecordingControls.module.scss';

const RecordingControls = ({
  isRecording,
  startRecording,
  sendAudioMessage,
  deleteAudioMessage,
}) => {
  return (
    <div className={styles.recordingControls}>
      {!isRecording ? (
        <button
          aria-label='запись голосового сообщения'
          type='button'
          className={styles.recordingControls__send}
          onClick={startRecording}
        >
          <MicIcon className={styles.recordingControls__micro} />
        </button>
      ) : (
        <div className={styles.recordingControls__buttons}>
          <button
            type='button'
            className={styles.recordingControls__delete}
            onClick={deleteAudioMessage}
          >
            <DeleteIcon />
          </button>
          <button
            type='button'
            className={styles.recordingControls__send}
            onClick={sendAudioMessage}
          >
            <SendIcon className={styles.recordingControls__sendIcon} />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecordingControls;
