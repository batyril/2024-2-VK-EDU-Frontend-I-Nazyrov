import AttachFileIcon from '@mui/icons-material/AttachFile';
import MapIcon from '@mui/icons-material/Map';
import FolderIcon from '@mui/icons-material/Folder';
import * as styles from './AttachDropdown.module.scss';

function AttachDropdown({
  isDropdownOpen,
  setIsDropdownOpen,
  handleLocation,
  handleFiles,
}) {
  return (
    <div
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
      className={styles.attachMenu}
    >
      <AttachFileIcon className={styles.attachIcon} />
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownItem} onClick={handleLocation}>
            <MapIcon /> Location
          </div>
          <div className={styles.dropdownItem} onClick={handleFiles}>
            <FolderIcon /> File
          </div>
        </div>
      )}
    </div>
  );
}

export default AttachDropdown;
