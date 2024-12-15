import * as styles from './AvatarUploader.module.scss';
import defaultAvatar from './../../img/avatar-default.jpg';
function AvatarUploader({ avatarUrl, handleChange, error }) {
  return (
    <div className={styles.avatarContainer}>
      <img
        alt='фото профиля'
        className={styles.avatar}
        src={avatarUrl || defaultAvatar}
      />
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.overlay}>
        <label className={styles.uploadLabel}>
          Загрузить фото
          <input
            name='avatar'
            type='file'
            accept='image/*'
            className={styles.uploadInput}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
}

export default AvatarUploader;
