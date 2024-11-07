import { useEffect } from 'react';

function useDialogBackdropClick(dialogRef, onClose) {
  useEffect(() => {
    function handleBackdropClick(event) {
      if (dialogRef.current && event.target === dialogRef.current) {
        onClose();
      }
    }

    const dialog = dialogRef.current;
    if (dialog) {
      dialog.addEventListener('click', handleBackdropClick);
    }

    return () => {
      if (dialog) {
        dialog.removeEventListener('click', handleBackdropClick);
      }
    };
  }, [dialogRef, onClose]);
}

export default useDialogBackdropClick;
