import { RefObject, useEffect } from 'react';

function useDialogBackdropClick(
  dialogRef: RefObject<HTMLDialogElement>,
  onClose: () => void,
) {
  useEffect(() => {
    function handleBackdropClick(event: MouseEvent) {
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
