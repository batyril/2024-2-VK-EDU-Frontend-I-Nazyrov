import { useState } from 'react';
import { toast } from 'react-toastify';

function useDragAndDrop() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);

    const imageFiles = droppedFiles.filter((file) =>
      file.type.startsWith('image/'),
    );

    if (imageFiles.length < droppedFiles.length) {
      toast.error('Можно загружать только изображения!');
    }

    setFiles((prevFiles) => [...prevFiles, ...imageFiles]);
  };
  return {
    isDragging,
    files,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    setFiles,
  };
}

export default useDragAndDrop;
